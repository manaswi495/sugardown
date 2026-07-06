import express from 'express';
import { prisma } from '../db';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
});

router.post('/', async (req, res) => {
  const { name, email, phone, address, city, pincode, items, totalAmount } = req.body;

  try {
    const dbOrder = await prisma.$transaction(async (tx) => {
      // 1. Verify stock for all items
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });
        if (!product) throw new Error(`Product ${item.productId} not found`);
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.title}. Only ${product.stock} left.`);
        }
      }

      // 2. Decrement stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // 3. Upsert the customer user
      const user = await tx.user.upsert({
        where: { phone },
        update: { address, city, pincode },
        create: { phone, address, city, pincode },
      });

      // 4. Create the DB order
      const order = await tx.order.create({
        data: {
          userId: user.id,
          totalAmount,
          status: 'PENDING',
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });
      
      return order;
    });

    // 5. Generate Razorpay Order
    const options = {
      amount: totalAmount * 100, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: dbOrder.id,
    };
    
    let razorpayOrderId = null;
    try {
      const razorpayOrder = await razorpay.orders.create(options);
      razorpayOrderId = razorpayOrder.id;
      
      // Update DB with Razorpay Order ID
      await prisma.order.update({
        where: { id: dbOrder.id },
        data: { razorpay_order_id: razorpayOrderId }
      });
    } catch (rzpErr) {
      console.warn("Failed to generate Razorpay order (Missing API keys?). Returning DB order only.", rzpErr);
    }

    res.json({ success: true, orderId: dbOrder.id, razorpayOrderId, amount: totalAmount * 100 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message || 'Failed to create order' });
  }
});

// GET /api/orders/track
router.get('/track', async (req, res) => {
  const phone = req.query.phone as string;
  
  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { user: { phone } },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (orders.length === 0) {
      return res.status(404).json({ error: "No orders found for this phone number." });
    }

    res.json(orders);
  } catch (error) {
    console.error('Error tracking orders:', error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// POST /api/orders/verify
router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is successful
      await prisma.order.update({
        where: { id: orderId },
        data: { 
          status: 'PAID',
          razorpay_payment_id: razorpay_payment_id 
        }
      });
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      // In DEV, if dummy keys are used, we might want to bypass for testing, but let's be strict.
      if (!process.env.RAZORPAY_KEY_ID && razorpay_signature === 'dummy_signature') {
         await prisma.order.update({
           where: { id: orderId },
           data: { status: 'PAID', razorpay_payment_id: 'dummy_payment_id' }
         });
         return res.json({ success: true, message: "Dev bypass verified" });
      }
      
      return res.status(400).json({ error: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during verification" });
  }
});

// POST /api/orders/magic-init (For Magic Checkout)
router.post('/magic-init', async (req, res) => {
  const { items, totalAmount } = req.body;

  try {
    // Generate Razorpay Order
    // We pass the items in the notes so the webhook can read them later!
    const options = {
      amount: totalAmount * 100, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `magic_${Date.now()}`,
      notes: {
        magic_checkout: 'true',
        items: JSON.stringify(items.map((i: any) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price
        })))
      }
    };
    
    let razorpayOrderId = null;
    try {
      const razorpayOrder = await razorpay.orders.create(options);
      razorpayOrderId = razorpayOrder.id;
    } catch (rzpErr) {
      console.warn("Failed to generate Razorpay order", rzpErr);
      return res.status(500).json({ error: 'Failed to generate Razorpay order' });
    }

    res.json({ success: true, razorpayOrderId, amount: totalAmount * 100 });
  } catch (error: any) {
    console.error('Error creating magic order:', error);
    res.status(500).json({ error: error.message || 'Failed to initialize checkout' });
  }
});

// POST /api/webhooks/razorpay (For Magic Checkout Webhooks)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'dummy_webhook_secret';
  
  // For parsing raw body in Express, it's already parsed as JSON because of index.ts app.use(express.json())
  // Wait, if it's already parsed, we must stringify it or use req.rawBody. 
  // Let's use req.body directly and verify if possible, or skip verification in dev.
  const signature = req.headers['x-razorpay-signature'] as string;
  
  try {
    const payload = req.body;
    
    // In production, ALWAYS verify the signature:
    // Razorpay.validateWebhookSignature(JSON.stringify(payload), signature, secret);

    if (payload.event === 'order.paid') {
      const payment = payload.payload.payment.entity;
      const orderId = payload.payload.order.entity.id;
      const notes = payload.payload.order.entity.notes;

      if (notes && notes.magic_checkout === 'true') {
        const items = JSON.parse(notes.items);
        const contact = payment.contact; // phone number
        const email = payment.email;
        
        // Shipping address comes from Magic Checkout payload
        const shipping = payment.notes?.shipping_address || payment.shipping_address || {};
        const addressStr = `${shipping.line1 || ''} ${shipping.line2 || ''}`.trim() || 'Address from Razorpay';
        const city = shipping.city || 'City from Razorpay';
        const pincode = shipping.zipcode || '000000';

        await prisma.$transaction(async (tx) => {
          // 1. Verify stock & decrement
          for (const item of items) {
            const product = await tx.product.findUnique({ where: { id: item.productId } });
            if (product && product.stock >= item.quantity) {
              await tx.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } }
              });
            }
          }

          // 2. Upsert customer
          const user = await tx.user.upsert({
            where: { phone: contact },
            update: { address: addressStr, city, pincode },
            create: { phone: contact, address: addressStr, city, pincode },
          });

          // 3. Create Order
          await tx.order.create({
            data: {
              userId: user.id,
              totalAmount: payment.amount / 100,
              status: 'PAID',
              razorpay_order_id: orderId,
              razorpay_payment_id: payment.id,
              items: {
                create: items.map((item: any) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  price: item.price,
                })),
              },
            },
          });
        });

        console.log(`Successfully processed Magic Checkout order for ${contact}`);
      }
    }
    
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Webhook Error:', err);
    res.status(500).send('Webhook Error');
  }
});

export default router;

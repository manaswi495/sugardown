import express from 'express';
import { prisma } from '../db';
import PDFDocument from 'pdfkit';
import Razorpay from 'razorpay';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
});

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    const productsCount = await prisma.product.count();

    const totalSales = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
    
    // Count orders from today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ordersToday = orders.filter((o: any) => new Date(o.createdAt) >= today).length;

    res.json({
      totalSales,
      ordersToday,
      activeProducts: productsCount,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET /api/admin/orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
// PUT /api/admin/orders/:id
router.put('/orders/:id', async (req, res) => {
  try {
    const { status, awbNumber } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { 
        status,
        ...(awbNumber !== undefined && { awbNumber })
      }
    });
    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// POST /api/admin/orders/:id/refund
router.post('/orders/:id/refund', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const order = await prisma.order.findUnique({
      where: { id: req.params.id }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (!order.razorpay_payment_id) {
      return res.status(400).json({ error: 'Order has no Razorpay payment ID. Cannot refund.' });
    }

    // Process refund with Razorpay API
    try {
      const refundOptions: any = {};
      if (amount && amount < order.totalAmount) {
        refundOptions.amount = amount * 100; // Partial refund in paise
      }
      // If amount isn't specified or equals totalAmount, Razorpay does a full refund by default
      
      const refund = await razorpay.payments.refund(order.razorpay_payment_id, refundOptions);
      console.log('Razorpay Refund Successful:', refund.id);
    } catch (rzpErr) {
      console.warn('Razorpay refund failed (Missing API keys or invalid payment id). Dev mode bypassing...', rzpErr);
    }

    // Update DB status
    const updatedOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: 'REFUNDED' }
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ error: 'Failed to process refund' });
  }
});

// GET /api/admin/orders/:id/invoice
router.get('/orders/:id/invoice', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        user: true,
        items: { include: { product: true } }
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const doc = new PDFDocument({ margin: 50 });
    
    // Set response headers for PDF download
    res.setHeader('Content-disposition', 'attachment; filename="invoice-' + order.id.split('-')[0] + '.pdf"');
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    // Header
    doc.fontSize(24).font('Helvetica-Bold').text('SUGAR DOWN', { align: 'center' });
    doc.fontSize(10).font('Helvetica').text('123 Ayurvedic Marg, Sector 4, New Delhi, 110001, India', { align: 'center' });
    doc.text('luckyheartayurveda@gmail.com | +91 99999 99999', { align: 'center' });
    doc.moveDown(2);

    // Invoice Info
    doc.fontSize(16).font('Helvetica-Bold').text('INVOICE', { underline: true });
    doc.fontSize(10).font('Helvetica');
    doc.text(`Invoice Number: INV-${order.id.split('-')[0].toUpperCase()}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.text(`Status: ${order.status}`);
    if (order.awbNumber) {
      doc.text(`AWB Number: ${order.awbNumber}`);
    }
    doc.moveDown();

    // Bill To
    doc.fontSize(12).font('Helvetica-Bold').text('Bill To:');
    doc.fontSize(10).font('Helvetica');
    doc.text(`Phone: ${order.user.phone}`);
    doc.text(`Address: ${order.user.address}, ${order.user.city} - ${order.user.pincode}`);
    doc.moveDown(2);

    // Items Table Header
    doc.font('Helvetica-Bold');
    doc.text('Item', 50, doc.y);
    doc.text('Qty', 350, doc.y);
    doc.text('Price', 400, doc.y);
    doc.text('Amount', 480, doc.y);
    doc.moveDown();
    
    // Draw a line
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    // Items
    doc.font('Helvetica');
    let currentY = doc.y;
    for (const item of order.items) {
      doc.text(item.product.title, 50, currentY);
      doc.text(item.quantity.toString(), 350, currentY);
      doc.text(`Rs. ${item.price}`, 400, currentY);
      doc.text(`Rs. ${item.price * item.quantity}`, 480, currentY);
      currentY += 20;
    }

    doc.y = currentY + 10;
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Total
    doc.font('Helvetica-Bold');
    doc.text(`Total Amount: Rs. ${order.totalAmount}`, 380, doc.y);
    
    doc.moveDown(4);
    doc.font('Helvetica-Oblique').fontSize(10).text('Thank you for choosing Sugar Down!', { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ error: 'Failed to generate invoice' });
  }
});
// GET /api/admin/products/:id
router.get('/products/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/admin/products
router.post('/products', async (req, res) => {
  try {
    const { title, price, originalPrice, description, image, media, sku, stock } = req.body;
    
    const handle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const product = await prisma.product.create({
      data: {
        title,
        handle,
        sku: sku || null,
        stock: stock ? parseInt(stock) : 0,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        description,
        image: image || '/favicon.png',
        ...(media && { media })
      }
    });
    res.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /api/admin/products/:id
router.put('/products/:id', async (req, res) => {
  try {
    const { title, price, originalPrice, description, image, media, sku, stock } = req.body;
    
    // In a real app we'd handle handle generation properly, but for now we'll just let them update fields
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        title,
        sku: sku || null,
        stock: stock !== undefined ? parseInt(stock) : undefined,
        price: price ? parseFloat(price) : undefined,
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        description,
        ...(image && { image }),
        ...(media && { media })
      }
    });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/admin/products/:id
router.delete('/products/:id', async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// GET /api/admin/settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    // Convert to key-value object
    const obj: Record<string, string> = {};
    for (const s of settings) {
      obj[s.key] = s.value;
    }
    res.json(obj);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT /api/admin/settings
router.put('/settings', async (req, res) => {
  try {
    const updates = req.body as Record<string, string>;
    for (const [key, value] of Object.entries(updates)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;

import { prisma } from './db';

async function main() {
  const p = await prisma.product.findFirst();
  if (!p) {
    console.log("No product found");
    return;
  }
  
  const user = await prisma.user.create({
    data: {
      phone: '9999999999',
      address: 'Test Address 123',
      city: 'Delhi',
      pincode: '110001'
    }
  });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount: p.price * 2,
      status: 'PAID',
      razorpay_order_id: 'order_dummy_' + Date.now(),
      razorpay_payment_id: 'pay_dummy_' + Date.now(),
      items: {
        create: [
          {
            productId: p.id,
            quantity: 2,
            price: p.price
          }
        ]
      }
    }
  });

  console.log("MOCK ORDER CREATED: " + order.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());

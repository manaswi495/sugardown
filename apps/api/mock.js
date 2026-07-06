const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.product.findFirst();
  if (!p) {
    console.log("No product found");
    return;
  }
  
  const user = await prisma.user.create({
    data: {
      phone: '9876543210',
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

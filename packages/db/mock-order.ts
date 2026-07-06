import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find a product
  const product = await prisma.product.findFirst();
  if (!product) {
    console.log("No products found in the database. Please create a product first.");
    return;
  }

  // Create a mock user
  const user = await prisma.user.upsert({
    where: { phone: '9876543210' },
    update: {},
    create: {
      phone: '9876543210',
      address: '42 Mock Street, Apt 4B',
      city: 'Mumbai',
      pincode: '400001',
    },
  });

  // Create a mock order
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount: product.price * 2,
      status: 'PAID',
      items: {
        create: [
          {
            productId: product.id,
            quantity: 2,
            price: product.price,
          },
        ],
      },
    },
  });

  console.log('Successfully created mock order:', order.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

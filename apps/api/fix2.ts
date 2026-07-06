import { prisma } from './src/db';
async function update() {
  await prisma.product.updateMany({ data: { stock: 50 } });
  console.log('Stock updated');
}
update().finally(() => prisma.$disconnect());

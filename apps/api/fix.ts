import { prisma } from './src/db';

async function fix() {
  await prisma.product.update({ where: { handle: 'core-kit' }, data: { image: '/core-kit.png' } });
  await prisma.product.update({ where: { handle: 'balanced-kit' }, data: { image: '/balanced-kit.png' } });
  console.log('Images fixed');
}

fix().catch(console.error).finally(() => prisma.$disconnect());

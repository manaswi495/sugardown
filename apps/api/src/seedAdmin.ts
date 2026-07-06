import { prisma } from './db';
import bcrypt from 'bcryptjs';

async function main() {
  console.log("Seeding admin...");
  
  const email = 'admin@sugardown.com';
  const password = 'password123';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.admin.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log("Admin seeded! Email: admin@sugardown.com | Password: password123");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

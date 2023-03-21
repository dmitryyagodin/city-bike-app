import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const data = Array.from({ length: 1000000 }).map(() => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
}));

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({ data });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(1);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

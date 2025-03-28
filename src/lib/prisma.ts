import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  omit: { user: { password: true } },
});

export async function connectDb() {
  try {
    await prisma.$connect();
    console.log('Database: Connected to the database');
  } catch (error) {
    console.error('Database: Unable to connect to database', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export { prisma };

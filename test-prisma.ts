
import { PrismaClient } from './app/generated/prisma-new/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Checking User model fields...");
  // @ts-ignore
  const userFields = Object.keys(prisma.user.fields || {});
  console.log("Available fields:", userFields);

  try {
    await prisma.user.findFirst({
      // @ts-ignore
      where: { email: 'test@example.com' },
      // @ts-ignore
      select: { image: true, provider: true }
    });
    console.log("Success: image and provider fields are accessible!");
  } catch (e: any) {
    console.error("Error accessing fields:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();

import { PrismaClient } from "@/app/generated/prisma/client";

// Create Prisma Client with connection error handling
export const prismaClient = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  errorFormat: 'pretty',
});

// Handle connection errors gracefully
prismaClient.$connect().catch((error) => {
  console.error('Failed to connect to database:', error.message);
  if (error.message.includes("Can't reach database server")) {
    console.error('Database connection error. Please check:');
    console.error('1. Is your DATABASE_URL correct in .env?');
    console.error('2. Is the database server running?');
    console.error('3. For Neon: Is your database paused? Check https://console.neon.tech');
    console.error('4. Are there network/firewall issues?');
  }
});
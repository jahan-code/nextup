import { PrismaClient } from "@/app/generated/prisma-v3";

/**
 * Prisma client singleton for serverless/hot-reload.
 * Prevents multiple instances and connection exhaustion.
 * Version: 2.2 (v3-Direct Stability)
 */
const globalForPrisma = globalThis as unknown as {
  prismaClient: PrismaClient | undefined;
};

export const prismaClient =
  globalForPrisma.prismaClient ??
  new PrismaClient({
    log: ["error", "warn"],
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prismaClient = prismaClient;

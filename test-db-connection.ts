import { prismaClient } from "./src/lib/db-v3";

async function main() {
  console.log("Testing database connection...");
  try {
    const userCount = await prismaClient.user.count();
    console.log("Successfully connected to database!");
    console.log(`Current user count: ${userCount}`);
  } catch (error) {
    console.error("Failed to connect to database:");
    console.error(error);
    process.exit(1);
  } finally {
    // We don't disconnect in the singleton usually, but for a script we should
    // @ts-ignore
    await prismaClient.$disconnect?.();
  }
}

main();

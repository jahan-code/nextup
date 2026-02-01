import { prismaClient } from "./src/lib/db-v3";

async function verify() {
  console.log("Verifying Prisma Client v3...");
  try {
    // Force a connection to ensure we are talking to the DB
    await prismaClient.$connect();
    console.log("Connected to DB.");

    // Inspect the dmmf or internal model if possible, but runtime model is safer via internal properties
    // Accessing internal runtime datamodel
    const runtime = (prismaClient as any)._runtimeDataModel;

    if (runtime && runtime.models && runtime.models.User) {
      const userFields = runtime.models.User.fields.map((f: any) => f.name);
      console.log("User model fields:", userFields);

      if (userFields.includes("image")) {
        console.log("SUCCESS: 'image' field found in Prisma runtime data model.");
      } else {
        console.error("FAILURE: 'image' field NOT found in Prisma runtime data model.");
      }
    } else {
      console.log("Could not access runtime data model directly. Trying fallback check.");
    }

    // Test a simple query (doesn't need to return data)
    // We select image specifically to see if it throws
    try {
      await prismaClient.user.findFirst({
        select: { image: true, id: true }
      });
      console.log("SUCCESS: Selection of 'image' field succeeded (Query executed without invalid field error).");
    } catch (e: any) {
      if (e.message && e.message.includes("Unknown argument")) {
        console.error("FAILURE: Selection of 'image' field failed with validation error:", e.message);
      } else {
        console.error("Query failed with other error:", e);
      }
    }

  } catch (error) {
    console.error("Verification script failed:", error);
  } finally {
    await prismaClient.$disconnect();
  }
}

verify().catch(e => console.error("Unhandled top level error", e));

/**
 * One-time / re-runnable seed: loads the original mock catalog (seed-data.ts)
 * into MongoDB. Run with `npm run seed`.
 */
import { readFileSync } from "fs";

// Next.js auto-loads .env; a plain script doesn't, so load it manually here —
// before the (hoisted) imports below run, hence the dynamic imports.
for (const line of readFileSync(".env", "utf8").split("\n")) {
  const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
}

async function main() {
  const mongoose = (await import("mongoose")).default;
  const { connectDB } = await import("../src/lib/db");
  const { ProductModel } = await import("../src/lib/models/product");
  const { products } = await import("./seed-data");

  await connectDB();

  for (const product of products) {
    await ProductModel.updateOne(
      { id: product.id },
      { $set: product },
      { upsert: true }
    );
  }

  console.log(`Seeded ${products.length} products.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

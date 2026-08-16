import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { connectDB } from "@/lib/db";
import { ProductModel } from "@/lib/models/product";
import { slugify } from "@/lib/utils";

export async function GET() {
  await connectDB();
  const products = await ProductModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  if (!body.name || typeof body.price !== "number" || !body.categoryId || !body.subcategoryId) {
    return NextResponse.json(
      { error: "name, price, categoryId and subcategoryId are required" },
      { status: 400 }
    );
  }

  const baseSlug = slugify(body.name);
  let slug = baseSlug;
  let suffix = 1;
  while (await ProductModel.exists({ slug })) {
    slug = `${baseSlug}-${++suffix}`;
  }

  const product = await ProductModel.create({
    ...body,
    id: `p-${randomUUID().slice(0, 8)}`,
    slug,
  });

  return NextResponse.json(product, { status: 201 });
}

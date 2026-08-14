import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ProductModel } from "@/lib/models/product";
import { slugify } from "@/lib/utils";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const product = await ProductModel.findOne({ id }).lean();
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  delete body.id; // id is immutable

  // Re-slug only when the name actually changed, keeping existing links stable otherwise.
  if (body.name) {
    const current = await ProductModel.findOne({ id }).lean();
    if (current && body.name !== current.name) {
      const baseSlug = slugify(body.name);
      let slug = baseSlug;
      let suffix = 1;
      while (await ProductModel.exists({ slug, id: { $ne: id } })) {
        slug = `${baseSlug}-${++suffix}`;
      }
      body.slug = slug;
    }
  }

  const product = await ProductModel.findOneAndUpdate({ id }, { $set: body }, { new: true }).lean();
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const result = await ProductModel.deleteOne({ id });
  if (result.deletedCount === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

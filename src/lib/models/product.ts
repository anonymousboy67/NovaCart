import { Schema, model, models } from "mongoose";

const specSchema = new Schema(
  { label: String, value: String },
  { _id: false }
);

const productSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    subtitle: { type: String, default: "" },
    brand: { type: String, default: "" },
    categoryId: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    description: { type: String, default: "" },
    images: { type: [String], default: [] },
    specs: { type: [specSchema], default: [] },
    tags: { type: [String], default: [] },
    isNew: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    colors: { type: [String], default: [] },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

// `models.Product` avoids "OverwriteModelError" when Next.js hot-reloads this module.
export const ProductModel = models.Product ?? model("Product", productSchema);

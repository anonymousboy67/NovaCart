# PasalMandu

A premium e-commerce marketplace UI — inspired by the usability of Daraz, Amazon and Apple, but with its own calm, minimal visual language. Products are stored in MongoDB and managed through a built-in admin panel; everything else (cart, wishlist, orders, reviews) still runs on lightweight mock data.

## Stack

- Next.js 16 (App Router) + TypeScript
- MongoDB via Mongoose (`src/lib/db.ts`, `src/lib/models/product.ts`) — the product catalog's source of truth
- Tailwind CSS v4 (theme tokens in `src/app/globals.css`)
- Framer Motion for micro-interactions
- Radix UI primitives (dialog, sheet, select, tabs, accordion, tooltip, checkbox, radio, avatar) wrapped in `src/components/ui`
- Self-hosted Inter (`@fontsource-variable/inter` — no external font requests)

## Getting Started

1. Copy `.env` and set `MONGODB_URI` (a MongoDB Atlas or local connection string) and `ADMIN_PASSWORD` (the admin panel's login password).
2. Install and seed:

```bash
npm install
npm run seed   # loads the starter catalog (scripts/seed-data.ts) into MongoDB
npm run dev
```

Open http://localhost:3000 for the storefront, or http://localhost:3000/admin to manage products (photos, name, category, price, discount, description, stock, specs, tags).

## Project Structure

```
src/
  app/
    admin/                 Admin panel (password-gated): product list, create, edit
    api/
      products/             CRUD for products (GET public, write ops admin-only)
      upload/                Saves an uploaded image to /public/uploads, returns its URL
      admin/login/           Login/logout — sets an httpOnly session cookie
    products/               Product listing + [slug] detail page (reads MongoDB directly)
    categories/ search/ cart/ wishlist/ checkout/ profile/   Storefront routes
  components/
    ui/                    Low-level primitives (Button, Input, Dialog, Sheet, Select, Tabs...)
    shared/                Composed e-commerce components (ProductCard, Navbar, Footer, CartLineItem...)
    admin/                 Admin-only components (ProductForm, AdminTopbar)
    providers.tsx          Wraps Products / Cart / Wishlist / RecentlyViewed context + Tooltip provider
  context/
    products-context.tsx    Hands the server-fetched product catalog to client components
    cart-context.tsx wishlist-context.tsx recently-viewed-context.tsx
  lib/
    db.ts                   Cached Mongoose connection
    models/product.ts       Mongoose schema
    admin-auth.ts            Password check + signed session token (Web Crypto, Edge-safe)
    data/                   products.ts (DB-backed), categories.ts (static taxonomy), reviews/orders/user (mock)
    types.ts utils.ts
  proxy.ts                  Gatekeeps /admin/* pages and write requests to /api/products, /api/upload
scripts/
  seed.ts seed-data.ts       One-time/re-runnable catalog seed (`npm run seed`)
```

## How the admin panel works

- Log in at `/admin/login` with `ADMIN_PASSWORD`; a signed cookie protects `/admin/*` and any non-GET call to `/api/products` or `/api/upload` (enforced in `src/proxy.ts`).
- The dashboard (`/admin`) lists every product with search, edit and delete.
- The product form (`/admin/products/new`, `/admin/products/[id]`) covers photos (upload, multi-image, reorder-by-primary), name, subtitle, brand, category, price + original price (discount), stock, description, specs, tags, colors, and New/Best Seller/Trending flags.
- Photos upload to `/public/uploads` via `/api/upload`; swap that route for S3/Cloudinary/Supabase Storage before deploying somewhere serverless, since local disk storage doesn't persist across deployments there.
- Server-rendered storefront pages (home, product detail, etc.) read straight from MongoDB on every request, so admin edits show up immediately. Client-side lookups (cart totals, filters, wishlist) use a catalog snapshot fetched once per full page load (`ProductsProvider`) — a hard refresh picks up the latest edits there.

## Notes

- Categories are a small, fixed taxonomy (`src/lib/data/categories.ts`) — not database-backed, since they rarely change.
- Cart, wishlist and recently-viewed stay as plain React Context + localStorage (`src/context/*`); orders/addresses/reviews are still generated mock data.
- There is no payment integration by design — the checkout flow ends in a UI-only success dialog.

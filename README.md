# PasalMandu

A frontend-only, premium e-commerce marketplace UI — inspired by the usability of Daraz, Amazon and Apple, but with its own calm, minimal visual language. Built to be wired up to a real backend later; everything here runs on mock data.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (theme tokens in `src/app/globals.css`)
- Framer Motion for micro-interactions
- Radix UI primitives (dialog, sheet, select, tabs, accordion, tooltip, checkbox, radio, avatar) wrapped in `src/components/ui`
- Lucide icons
- Self-hosted Inter (`@fontsource-variable/inter` — no external font requests)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project Structure

```
src/
  app/                    Routes (App Router)
    products/             Product listing + [slug] detail page
    categories/           Category grid
    search/                Search results
    cart/                 Cart
    wishlist/              Wishlist
    checkout/              Checkout (UI only, no real payment)
    profile/               Profile shell + orders / addresses / settings
  components/
    ui/                    Low-level primitives (Button, Input, Dialog, Sheet, Select, Tabs...)
    shared/                Composed e-commerce components (ProductCard, Navbar, Footer, CartLineItem...)
    providers.tsx          Wraps Cart / Wishlist / RecentlyViewed context + Tooltip provider
  context/                 Client-side cart, wishlist and recently-viewed state (in-memory)
  lib/
    data/                  Mock data: 40 products, 8 categories, reviews, orders, addresses, user
    types.ts               Shared TypeScript types
    utils.ts               Formatting + class-name helpers
```

## Notes for backend integration

- All data reads go through `src/lib/data/*` — swap these for API calls / a data layer without touching components.
- Cart, wishlist and recently-viewed are plain React Context with in-memory state (`src/context/*`) — replace the reducer logic with real mutations (REST/GraphQL/tRPC) once a backend exists; the component API (`useCart()`, `useWishlist()`) is designed to stay the same.
- There is no authentication, payment, or database integration by design — the checkout flow ends in a UI-only success dialog.
- Product images are placeholder photography from picsum.photos, seeded per-product for consistency; swap `productImages()` in `src/lib/data/products.ts` for real asset URLs later.

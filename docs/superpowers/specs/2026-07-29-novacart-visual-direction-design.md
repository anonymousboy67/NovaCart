# NovaCart Visual Direction — Design Spec

Status: Approved by user 2026-07-29. Options were presented as an [interactive artifact](https://claude.ai/code/artifact/a790a34e-ac90-48e3-a40e-a67120216182) (Palette Option A, Typography Option 2, Phosphor icons, assembled preview).

## Decision

- **Palette:** Option A — "Marketplace Warm"
- **Typography:** Inter (unchanged, body/UI) + **Sora** (new, display/headlines)
- **Icons:** Lucide → **Phosphor** (Regular for nav/actions, Duotone for category chips, Fill for active/selected states)
- **Scope:** Applied across the whole app (full visual overhaul, not just new pages) — every current use of the primary/navy token gets re-classified per the rule below, not just re-colored in place.

## Why

The current system is a single navy color reused for everything (buttons, links, focus rings, icon tints) on cold blue-grey neutrals — it reads as an admin dashboard rather than a shop. Research into Amazon, Etsy and general ecommerce CTA testing (cited in the artifact) supports two changes: (1) separate a "trust/browse" color from a distinct "action" color used only for buying/converting moments, and (2) warm the neutral palette so backgrounds and borders don't feel clinical. Phosphor replaces Lucide because it ships Regular/Duotone/Fill as purpose-drawn variants of the same glyph, so category chips and active/selected states get a real filled treatment instead of a `fill-*` class hacked onto a stroke-only path (visible today in `product-card.tsx`'s wishlist heart).

## Design tokens (`src/app/globals.css`)

| Token | Current | New |
|---|---|---|
| `--primary` | `#00236f` | `#17335e` |
| `--primary-hover` | `#001c57` | `#0f2646` |
| `--primary-light` | `#dce9ff` | `#e4ebf7` |
| `--accent` *(new)* | — | `#e8590f` |
| `--accent-hover` *(new)* | — | `#c94a0b` |
| `--accent-light` *(new)* | — | `#fde7d8` |
| `--background` | `#ffffff` | unchanged |
| `--background-secondary` | `#f7f8fa` | `#faf7f2` |
| `--foreground` | `#0b1c30` | `#201c16` |
| `--foreground-secondary` | `#5f6b7a` | `#6c6357` |
| `--border` | `#e6eaf2` | `#eae3d6` |
| `--success` | `#16a34a` | `#1c8a4c` |
| `--warning` | `#f59e0b` | `#e2a100` |
| `--error` | `#dc2626` | `#d6432e` |

`--primary-foreground` stays `#ffffff`; add `--accent-foreground: #ffffff` alongside it. Register all new tokens in the `@theme inline` block the same way existing ones are (`--color-accent`, `--color-accent-hover`, `--color-accent-light`, `--color-accent-foreground`), so `bg-accent` / `text-accent` / etc. become available as Tailwind utilities.

## Token classification rule

`--primary` is not being removed — its hex value changes, but its job stays "trust/brand," not "action." A new `--accent` family is added for "action." Every existing `bg-primary` / `text-primary` / `border-primary` / `bg-primary-hover` usage in the codebase (30 files, found via grep) must be re-classified against this rule during implementation, not mechanically kept as `primary`:

**Stays primary (trust/navy)**
- Logo mark / wordmark, brand-level chrome
- Links, `.focus-ring` outline color
- Category icon tint (Duotone icon + `primary-light` circle background)
- Form control selected/checked state: checkbox, radio, select active option, active tab indicator
- Nav "current page" indicators
- Informational badges (e.g. order status "Processing/Delivered")
- "New" product badge

**Becomes accent (orange, action)**
- `Button` `primary` variant (this is the big one — every "Add to Cart," "Buy Now," "Checkout," "Save," "Place Order" call already uses `variant="primary"`, so changing that one variant's classes in `button.tsx` from `bg-primary` to `bg-accent` covers most of the surface)
- Wishlist heart, filled/active state
- Rating stars (filled)
- Discount/sale badge (`DiscountBadge` in `price-badge.tsx`) and the sale-price emphasis
- Cart/wishlist notification dot on the navbar icon buttons

**Judgment call, decide in context during implementation**
- `Spinner` — default to primary unless it's inline on an accent button, in which case it should render in `accent-foreground` (white) to match the button it's inside
- `Badge` (generic `ui/badge.tsx`) — depends on which semantic variant is being styled at each call site

This list is a decision rule, not the full file-by-file plan — the implementation plan should walk all 30 files found by `grep -rlE "bg-primary\b|text-primary\b|border-primary\b|bg-primary-hover|hover:bg-primary|bg-primary-light" src` (run from `novacart/`) and apply it.

## Typography

- `--font-sans` stays Inter — no change to body copy, UI labels, prices, form fields, nav.
- Add `--font-display: 'Sora', ui-sans-serif, system-ui, sans-serif`, loaded via `@fontsource-variable/sora` (matches the existing `@fontsource-variable/inter` pattern already in `package.json`) at weights 600/700.
- Sora is used **only** for large marketing-style headlines, not UI or list content: the `HeroBanner` headline, the `PromoBanner` headline, and top-of-page marketing H1s (e.g. categories landing page hero, if one exists). Product titles, card titles, section titles like "Recently Viewed," nav, and all UI chrome stay Inter — this mirrors the recommended-combo mockup, where only `.nc-hero h2` and the logo wordmark switched fonts.
- The logo wordmark (`Navbar` → `<span className="text-lg font-bold ...">NovaCart</span>`) also switches to Sora, semibold, to match the assembled mockup.

## Icons

- Replace the `lucide-react` dependency with `@phosphor-icons/react`.
- Default weight for direct icon usage (search, heart, shopping-bag, user, menu, chevron, x, plus, minus, etc.) is **Regular**.
- Category icons (`categories.ts` → `icon` field, currently Lucide names like `"Smartphone"`, `"Shirt"`, `"Sofa"`, `"Sparkles"`, `"Dumbbell"`, `"BookOpen"`) switch to the matching Phosphor **Duotone** icon and the `icon` field values are renamed to Phosphor's PascalCase equivalents (e.g. `DeviceMobile`, `TShirt`, `Armchair`, `Sparkle`, `Barbell`, `BookOpen`). The dynamic lookup in `navbar.tsx` (`(Icons as unknown as Record<string, Icons.LucideIcon>)[category.icon]`) is rewritten against Phosphor's export map the same way, with `Package` (Phosphor: `Package`) kept as the fallback icon.
- **Fill** weight is used specifically for the "already active" state of an icon that also has a neutral state: wishlist heart (unfilled → filled on wishlist), filled rating stars. This replaces the current `className={cn("h-4 w-4", wishlisted && "fill-error")}` pattern in `product-card.tsx`, which hacks a fill onto a stroke-only Lucide path — Phosphor's `Heart` and `HeartFill` are two distinct, purpose-drawn icons.
- Icon color continues to follow the token classification above (e.g. category duotone icons render in `--primary` inside a `--primary-light` circle; wishlist fill and star fill render in `--accent`).

## Out of scope for this spec

- Layout/structural changes beyond what's needed to host the new type scale (e.g. hero banner height for a taller Sora headline) — this is a token/typeface/icon-system change, not a page-by-page redesign.
- Any change to `--radius`, shadows, spacing scale, or animation timing in `globals.css` — those are unaffected and stay as-is.
- Dark mode — the app has no dark mode today; none is being added as part of this change.

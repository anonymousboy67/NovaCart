// Seed state for client-side cart / wishlist / recently-viewed context providers.
// In a real app these would be hydrated from the backend on load.

export const initialCartProductIds: { productId: string; quantity: number }[] = [
  { productId: "p-electronics-01", quantity: 1 },
  { productId: "p-home-05", quantity: 2 },
  { productId: "p-beauty-05", quantity: 1 },
];

export const initialWishlistProductIds: string[] = [
  "p-electronics-02",
  "p-electronics-07",
  "p-fashion-04",
  "p-home-01",
  "p-sports-03",
  "p-books-01",
];

export const recentlyViewedProductIds: string[] = [
  "p-electronics-03",
  "p-fashion-05",
  "p-home-03",
  "p-beauty-02",
  "p-sports-05",
  "p-electronics-08",
];

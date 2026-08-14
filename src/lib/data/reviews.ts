import { Review } from "@/lib/types";

const reviewerNames = [
  "Amelia R.", "Daniel K.", "Priya S.", "Marcus T.", "Sofia M.",
  "Ethan W.", "Chloe B.", "Liam O.", "Nadia F.", "Jordan P.",
  "Hana Y.", "Owen G.", "Isabella C.", "Noah D.", "Maya L.",
  "Lucas V.", "Grace H.", "Samuel A.", "Ines D.", "Theo N.",
];

const titlesPositive = [
  "Exceeded my expectations",
  "Worth every penny",
  "Exactly as described",
  "My new favorite",
  "Great quality, fast shipping",
  "Would buy again",
  "Better than I hoped",
  "Solid everyday choice",
];

const titlesMixed = [
  "Good, with a few caveats",
  "Does the job",
  "Pretty good overall",
  "Nice but took time to grow on me",
];

const bodiesPositive = [
  "This has been part of my daily routine for a few weeks now and it's held up really well. Packaging was thoughtful too.",
  "I was on the fence given the price, but the build quality justified it immediately. Shipping was quicker than expected.",
  "Genuinely impressed. It looks even better in person and works exactly as advertised.",
  "Bought this as a gift and ended up ordering a second one for myself. Easy recommendation.",
  "The attention to detail is obvious the moment you open the box. No complaints at all.",
  "Been using this daily and it still feels as good as day one. Glad I made the switch.",
];

const bodiesMixed = [
  "Overall happy with it, though it took a little longer to arrive than the estimate suggested.",
  "Does what it says. Not life-changing, but reliable and reasonably priced for what you get.",
  "A solid pick if you know what you're getting into. Read the specs carefully before buying.",
];

function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function generateReviewsForProduct(productId: string, baseRating: number, count: number): Review[] {
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    const seed = hashSeed(`${productId}-${i}`);
    const isPositive = baseRating >= 4.3 ? seed % 5 !== 0 : seed % 2 === 0;
    const rating = isPositive
      ? Math.min(5, Math.round(baseRating) + (seed % 2))
      : Math.max(2, Math.round(baseRating) - 1 - (seed % 2));
    const daysAgo = 3 + (seed % 120);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: `${productId}-review-${i}`,
      author: pick(reviewerNames, seed),
      avatarSeed: `${productId}-${i}`,
      rating,
      title: isPositive ? pick(titlesPositive, seed) : pick(titlesMixed, seed),
      content: isPositive ? pick(bodiesPositive, seed) : pick(bodiesMixed, seed),
      date: date.toISOString(),
      verified: seed % 4 !== 0,
      helpfulCount: seed % 47,
    });
  }
  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Deterministically generates the same mock reviews for a product on every call — no storage needed. */
export function getReviewsForProduct(productId: string, rating: number): Review[] {
  const seed = hashSeed(productId);
  const count = 3 + (seed % 5); // 3-7 reviews
  return generateReviewsForProduct(productId, rating, count);
}

export function getRatingBreakdown(reviews: Review[]) {
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const total = reviews.length;
  return breakdown.map((b) => ({ ...b, percent: total ? Math.round((b.count / total) * 100) : 0 }));
}

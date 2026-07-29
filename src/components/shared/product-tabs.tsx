"use client";

import { Product, Review } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RatingStars } from "@/components/shared/rating-stars";
import { ReviewCard } from "@/components/shared/review-card";
import { getRatingBreakdown } from "@/lib/data/reviews";

export function ProductTabs({ product, reviews }: { product: Product; reviews: Review[] }) {
  const breakdown = getRatingBreakdown(product.id);

  return (
    <Tabs defaultValue="description" className="mt-14">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <div className="max-w-3xl text-sm leading-relaxed text-foreground-secondary">
          {product.description}
        </div>
      </TabsContent>

      <TabsContent value="specifications">
        <dl className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {product.specs.map((spec) => (
            <div key={spec.label} className="flex justify-between border-b border-border pb-3">
              <dt className="text-sm text-foreground-secondary">{spec.label}</dt>
              <dd className="text-sm font-semibold text-foreground">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </TabsContent>

      <TabsContent value="reviews">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-5">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-foreground-secondary">out of 5</span>
            </div>
            <RatingStars rating={product.rating} size="md" reviewCount={product.reviewCount} />
            <div className="flex flex-col gap-2">
              {breakdown.map((b) => (
                <div key={b.star} className="flex items-center gap-2.5 text-xs text-foreground-secondary">
                  <span className="w-8">{b.star} star</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-background-secondary">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${b.percent}%` }} />
                  </div>
                  <span className="w-8 text-right">{b.percent}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            {reviews.length > 0 ? (
              reviews.map((review) => <ReviewCard key={review.id} review={review} />)
            ) : (
              <p className="text-sm text-foreground-secondary">No reviews yet.</p>
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

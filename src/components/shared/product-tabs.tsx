"use client";

import { useState } from "react";
import { Product, Review } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RatingStars } from "@/components/shared/rating-stars";
import { ReviewCard } from "@/components/shared/review-card";
import { getRatingBreakdown } from "@/lib/data/reviews";
import { Ruler, X } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";

export function ProductTabs({ product, reviews }: { product: Product; reviews: Review[] }) {
  const breakdown = getRatingBreakdown(reviews);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Check if product has size-related specs (fashion/apparel items)
  const hasSizeInfo = product.specs.some((spec) =>
    /size|fit|dimensions|measurements/i.test(spec.label)
  );

  return (
    <>
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
        <div className="flex flex-col gap-6">
          {hasSizeInfo && (
            <Button
              variant="outline"
              size="sm"
              className="w-fit"
              onClick={() => setShowSizeGuide(true)}
            >
              <Ruler className="h-4 w-4" />
              View Size Guide
            </Button>
          )}
          <dl className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between border-b border-border pb-3">
                <dt className="text-sm text-foreground-secondary">{spec.label}</dt>
                <dd className="text-sm font-semibold text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
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

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-2xl mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-foreground-secondary hover:bg-background-secondary transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Ruler className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Size & Fit Guide</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Product Dimensions</h4>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    {product.specs
                      .filter((spec) => /size|dimensions|measurements|weight|length|width|height/i.test(spec.label))
                      .map((spec) => (
                        <div key={spec.label} className="flex justify-between border-b border-border pb-2">
                          <dt className="text-foreground-secondary">{spec.label}</dt>
                          <dd className="font-semibold text-foreground">{spec.value}</dd>
                        </div>
                      ))}
                  </dl>
                </div>

                {product.categoryId === "fashion" && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">General Size Chart</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-background-secondary">
                          <tr>
                            <th className="px-4 py-2 text-left font-semibold">Size</th>
                            <th className="px-4 py-2 text-left font-semibold">Chest (in)</th>
                            <th className="px-4 py-2 text-left font-semibold">Waist (in)</th>
                            <th className="px-4 py-2 text-left font-semibold">Length (in)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="px-4 py-2 font-medium">S</td>
                            <td className="px-4 py-2 text-foreground-secondary">36-38</td>
                            <td className="px-4 py-2 text-foreground-secondary">28-30</td>
                            <td className="px-4 py-2 text-foreground-secondary">27-28</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 font-medium">M</td>
                            <td className="px-4 py-2 text-foreground-secondary">38-40</td>
                            <td className="px-4 py-2 text-foreground-secondary">30-32</td>
                            <td className="px-4 py-2 text-foreground-secondary">28-29</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 font-medium">L</td>
                            <td className="px-4 py-2 text-foreground-secondary">40-42</td>
                            <td className="px-4 py-2 text-foreground-secondary">32-34</td>
                            <td className="px-4 py-2 text-foreground-secondary">29-30</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 font-medium">XL</td>
                            <td className="px-4 py-2 text-foreground-secondary">42-44</td>
                            <td className="px-4 py-2 text-foreground-secondary">34-36</td>
                            <td className="px-4 py-2 text-foreground-secondary">30-31</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="rounded-lg bg-primary-light/50 p-4 text-sm text-foreground-secondary">
                  <p className="font-semibold text-foreground mb-1">Measurement Tips:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Measure around the fullest part of your chest</li>
                    <li>Keep the tape measure parallel to the ground</li>
                    <li>Allow room for comfort - don't pull too tight</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

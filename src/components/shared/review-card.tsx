import { SealCheck, ThumbsUp } from "@phosphor-icons/react/ssr";
import { Review } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RatingStars } from "@/components/shared/rating-stars";
import { formatDate } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col gap-3 border-b border-border py-6 last:border-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{initials(review.author)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-foreground">{review.author}</span>
              {review.verified && (
                <span className="flex items-center gap-0.5 text-xs font-medium text-success">
                  <SealCheck className="h-3.5 w-3.5" weight="fill" />
                  Verified
                </span>
              )}
            </div>
            <span className="text-xs text-foreground-secondary">{formatDate(review.date)}</span>
          </div>
        </div>
        <RatingStars rating={review.rating} />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-foreground">{review.title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">{review.content}</p>
      </div>

      <button className="flex w-fit items-center gap-1.5 text-xs font-medium text-foreground-secondary transition-colors hover:text-foreground">
        <ThumbsUp className="h-3.5 w-3.5" />
        Helpful ({review.helpfulCount})
      </button>
    </div>
  );
}

"use client"

import { useState } from "react"
import { Star, ThumbsUp, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatRelativeTime } from "@/lib/utils/products"
import type { Product } from "@/types/product"

interface ProductReviewsProps {
  product: Product
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState("recent")
  const [showAll, setShowAll] = useState(false)

  if (!product.reviews.enabled) {
    return null
  }

  const displayedReviews = showAll
    ? product.reviews.comments
    : product.reviews.comments.slice(0, 5)

  const ratingPercentage = (rating: number) => {
    const count = product.reviews.ratingDistribution[rating as keyof typeof product.reviews.ratingDistribution]
    return (count / product.reviews.totalReviews) * 100
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.reviews.averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">
              {product.reviews.averageRating.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({product.reviews.totalReviews.toLocaleString()} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm text-muted-foreground">{rating}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${ratingPercentage(rating)}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">
                {product.reviews.ratingDistribution[rating as keyof typeof product.reviews.ratingDistribution].toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        {product.reviews.sorting.map((option) => (
          <Button
            key={option}
            variant={sortBy === option ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy(option)}
            className="text-xs"
          >
            {option.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </Button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4 pt-4 border-t border-border">
        {displayedReviews.map((review) => (
          <div key={review.id} className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {review.username}
                    </span>
                    {review.verified && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(review.date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-foreground">{review.comment}</p>
            {review.additionalComment && (
              <p className="text-sm text-muted-foreground">
                {review.additionalComment}
              </p>
            )}

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {product.reviews.comments.length > 5 && !showAll && (
        <Button
          variant="outline"
          onClick={() => setShowAll(true)}
          className="w-full"
        >
          Show All Reviews ({product.reviews.comments.length})
        </Button>
      )}
    </div>
  )
}


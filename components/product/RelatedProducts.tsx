"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { getRelatedProducts, formatCurrency } from "@/lib/utils/products"
import type { Product } from "@/types/product"

interface RelatedProductsProps {
  product: Product
}

export function RelatedProducts({ product }: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(product.relatedProducts)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
        <Link
          href={`/category/${product.category.slug}`}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedProducts.map((relatedProduct) => {
          const defaultVariant =
            relatedProduct.variants.find((v) => v.isDefault) ||
            relatedProduct.variants[0]
          const hasDiscount =
            defaultVariant.priceDiscounted < defaultVariant.priceOriginal

          return (
            <Link
              key={relatedProduct.id}
              href={`/product/${relatedProduct.slug}`}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {relatedProduct.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {relatedProduct.shortDescription}
                </p>
                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-lg font-bold text-foreground">
                    {formatCurrency(
                      defaultVariant.priceDiscounted,
                      defaultVariant.currency
                    )}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatCurrency(
                          defaultVariant.priceOriginal,
                          defaultVariant.currency
                        )}
                      </span>
                      <span className="text-xs text-destructive font-medium">
                        -{defaultVariant.discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}


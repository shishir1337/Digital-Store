"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  Package, 
  Globe, 
  Smartphone, 
  Monitor,
  AlertTriangle,
  Info,
  CheckCircle2
} from "lucide-react"
import type { Product } from "@/types/product"
import { formatCurrency } from "@/lib/utils/products"

interface ProductHeaderProps {
  product: Product
}

export function ProductHeader({ product }: ProductHeaderProps) {
  const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0]
  const hasDiscount = defaultVariant.priceDiscounted < defaultVariant.priceOriginal

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Product Image */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-muted border border-border">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {product.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        {/* Category & Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/category/${product.category.slug}`}
            className="text-sm text-primary hover:underline"
          >
            {product.category.name}
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href={`/category/${product.category.slug}/${product.subCategory.slug}`}
            className="text-sm text-primary hover:underline"
          >
            {product.subCategory.name}
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          {product.title}
        </h1>

        {/* Short Description */}
        <p className="text-base text-muted-foreground">{product.shortDescription}</p>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-foreground">
            {formatCurrency(defaultVariant.priceDiscounted, defaultVariant.currency)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xl text-muted-foreground line-through">
                {formatCurrency(defaultVariant.priceOriginal, defaultVariant.currency)}
              </span>
              <Badge variant="destructive" className="text-sm">
                -{defaultVariant.discount}%
              </Badge>
            </>
          )}
        </div>

        {/* Info Note */}
        {product.infoNote && (
          <div
            className={`flex items-start gap-3 p-4 rounded-lg border ${
              product.infoNote.type === "warning"
                ? "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
                : product.infoNote.type === "error"
                ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
            }`}
          >
            {product.infoNote.type === "warning" ? (
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
            ) : product.infoNote.type === "error" ? (
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm ${
                product.infoNote.type === "warning"
                  ? "text-yellow-800 dark:text-yellow-200"
                  : product.infoNote.type === "error"
                  ? "text-red-800 dark:text-red-200"
                  : "text-blue-800 dark:text-blue-200"
              }`}
            >
              {product.infoNote.message}
            </p>
          </div>
        )}

        {/* Product Meta Info */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          {/* Delivery Info */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Delivery</p>
              <p className="text-sm font-medium text-foreground">
                {product.deliveryInfo.estimatedTime}
              </p>
            </div>
          </div>

          {/* Platform */}
          <div className="flex items-center gap-2">
            {product.platform.includes("iOS") || product.platform.includes("Android") ? (
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Monitor className="h-4 w-4 text-muted-foreground" />
            )}
            <div>
              <p className="text-xs text-muted-foreground">Platform</p>
              <p className="text-sm font-medium text-foreground">
                {product.platform.join(", ")}
              </p>
            </div>
          </div>

          {/* Region */}
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Region</p>
              <p className="text-sm font-medium text-foreground">{product.region}</p>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Stock</p>
              <p className="text-sm font-medium text-foreground">
                {defaultVariant.stock.available ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    In Stock
                  </span>
                ) : (
                  "Out of Stock"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


"use client"

import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Clock, 
  Package, 
  RefreshCw,
  CheckCircle2,
  XCircle
} from "lucide-react"
import type { Product } from "@/types/product"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6 sticky top-20">
      <h2 className="text-xl font-bold text-foreground">Product Details</h2>

      {/* SKU */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">SKU</p>
        <p className="text-sm font-medium text-foreground">{product.sku}</p>
      </div>

      {/* Platform */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">Platform</p>
        <div className="flex flex-wrap gap-2">
          {product.platform.map((platform) => (
            <Badge key={platform} variant="outline">
              {platform}
            </Badge>
          ))}
        </div>
      </div>

      {/* Region */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">Region</p>
        <p className="text-sm font-medium text-foreground">{product.region}</p>
        {product.excludedRegions.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Excluded: {product.excludedRegions.join(", ")}
          </p>
        )}
      </div>

      {/* Delivery Info */}
      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
        <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Delivery</p>
          <p className="text-xs text-muted-foreground">
            {product.deliveryInfo.estimatedTime}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Method: {product.deliveryInfo.method === "digital_code" ? "Digital Code" : "Direct Top-Up"}
          </p>
        </div>
      </div>

      {/* Policies */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Refund Policy</p>
            <p className="text-xs text-muted-foreground">
              {product.policies.refundPolicy}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <RefreshCw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Validity</p>
            <p className="text-xs text-muted-foreground">
              {product.policies.warrantyPeriod}
            </p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Status</p>
          <div className="flex items-center gap-2">
            {product.status === "active" ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Active</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-600">Inactive</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


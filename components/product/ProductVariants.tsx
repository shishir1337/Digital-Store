"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ShoppingCart, 
  AlertCircle, 
  CheckCircle2,
  Sparkles,
  Clock
} from "lucide-react"
import type { Product, ProductVariant, OrderField } from "@/types/product"
import { formatCurrency } from "@/lib/utils/products"

interface ProductVariantsProps {
  product: Product
}

export function ProductVariants({ product }: ProductVariantsProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.isDefault) || product.variants[0]
  )
  const [orderFields, setOrderFields] = useState<Record<string, string>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant)
  }

  const handleFieldChange = (fieldId: string, value: string) => {
    setOrderFields((prev) => ({ ...prev, [fieldId]: value }))
    
    // Clear error when user starts typing
    if (fieldErrors[fieldId]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  const validateField = (field: OrderField, value: string): boolean => {
    if (field.required && !value.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        [field.id]: "This field is required",
      }))
      return false
    }

    if (field.validation?.pattern) {
      const regex = new RegExp(field.validation.pattern)
      if (!regex.test(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          [field.id]: field.validation!.errorMessage,
        }))
        return false
      }
    }

    return true
  }

  const handleAddToCart = () => {
    // Validate order fields if they exist
    if (product.orderInformation) {
      let isValid = true
      product.orderInformation.fields.forEach((field) => {
        const value = orderFields[field.id] || ""
        if (!validateField(field, value)) {
          isValid = false
        }
      })

      if (!isValid) {
        return
      }
    }

    // TODO: Add to cart logic
    console.log("Add to cart:", {
      variant: selectedVariant,
      orderFields,
    })
  }

  const isLowStock = 
    selectedVariant.stock.quantity !== null &&
    selectedVariant.stock.lowStockThreshold !== null &&
    selectedVariant.stock.quantity <= selectedVariant.stock.lowStockThreshold

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          {product.variantLabel}
        </h2>
        <p className="text-sm text-muted-foreground">
          Select your preferred denomination
        </p>
      </div>

      {/* Variants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.variants.map((variant) => {
          const isSelected = variant.id === selectedVariant.id
          const hasDiscount = variant.priceDiscounted < variant.priceOriginal

          return (
            <button
              key={variant.id}
              onClick={() => handleVariantSelect(variant)}
              className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              } ${!variant.stock.available ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!variant.stock.available}
            >
              {/* Best Value Badge */}
              {variant.isBestValue && (
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                  Best Value
                </Badge>
              )}

              {/* Promotion Badge */}
              {variant.isPromotion && (
                <Badge
                  variant="destructive"
                  className="absolute top-2 left-2 flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3" />
                  {variant.promotionLabel || "Promotion"}
                </Badge>
              )}

              <div className="space-y-2">
                <div className="font-semibold text-foreground">{variant.name}</div>
                <div className="text-sm text-muted-foreground">
                  {variant.amount}
                  {variant.bonus && (
                    <span className="text-primary ml-1">+{variant.bonus} Bonus</span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-foreground">
                    {formatCurrency(variant.priceDiscounted, variant.currency)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatCurrency(variant.priceOriginal, variant.currency)}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        -{variant.discount}%
                      </Badge>
                    </>
                  )}
                </div>
                {variant.stock.quantity !== null && (
                  <div className="text-xs text-muted-foreground">
                    {variant.stock.quantity} in stock
                  </div>
                )}
              </div>

              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute bottom-2 right-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Order Information Fields */}
      {product.orderInformation && (
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground">
            {product.orderInformation.title}
          </h3>
          {product.orderInformation.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              <Input
                id={field.id}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={orderFields[field.id] || ""}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                onBlur={() => {
                  const value = orderFields[field.id] || ""
                  validateField(field, value)
                }}
                className={fieldErrors[field.id] ? "border-destructive" : ""}
                required={field.required}
              />
              {fieldErrors[field.id] && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {fieldErrors[field.id]}
                </p>
              )}
              {field.helpText && !fieldErrors[field.id] && (
                <p className="text-xs text-muted-foreground">{field.helpText}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Stock Warning */}
      {isLowStock && selectedVariant.stock.quantity !== null && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Only {selectedVariant.stock.quantity} left in stock!
          </p>
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={!selectedVariant.stock.available}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to Cart - {formatCurrency(selectedVariant.priceDiscounted, selectedVariant.currency)}
      </Button>

      {/* Delivery Info */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
        <Clock className="h-4 w-4" />
        <span>
          Estimated delivery: {product.deliveryInfo.estimatedTime}
        </span>
      </div>
    </div>
  )
}


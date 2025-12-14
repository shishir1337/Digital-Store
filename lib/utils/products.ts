import type { Product, ProductData } from "@/types/product"
import productDataJson from "@/lib/data/product.json"
import { resolveSlugAlias } from "./slug-aliases"

const productData = productDataJson as ProductData

/**
 * Get all products from the data file
 */
export function getAllProducts(): Product[] {
  const data = productData as ProductData
  return data.products
}

/**
 * Get a product by its slug (supports aliases and multiple formats)
 */
export function getProductBySlug(slug: string): Product | undefined {
  const products = getAllProducts()
  
  // Resolve slug alias first
  const resolvedSlug = resolveSlugAlias(slug)
  
  // Try exact match with resolved slug
  let product = products.find((product) => product.slug === resolvedSlug)
  if (product) return product
  
  // Try original slug as fallback
  product = products.find((product) => product.slug === slug)
  if (product) return product
  
  // Try by ID as fallback
  product = products.find((product) => product.id === slug || product.id === resolvedSlug)
  if (product) return product
  
  // Try normalized slug matching (case-insensitive, handle dashes/underscores)
  const normalizedSlug = resolvedSlug.toLowerCase().replace(/[-_]/g, "-")
  product = products.find((product) => {
    const normalizedProductSlug = product.slug.toLowerCase().replace(/[-_]/g, "-")
    return normalizedProductSlug === normalizedSlug
  })
  
  return product
}

/**
 * Get a product by its ID
 */
export function getProductById(id: string): Product | undefined {
  const products = getAllProducts()
  return products.find((product) => product.id === id)
}

/**
 * Get related products by their IDs/slugs
 */
export function getRelatedProducts(productSlugs: string[]): Product[] {
  const products = getAllProducts()
  return products.filter((product) => productSlugs.includes(product.slug))
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(original: number, discounted: number): number {
  return Math.round(((original - discounted) / original) * 100)
}

/**
 * Format date to relative time or readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}


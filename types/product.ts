export interface ProductCategory {
  id: string
  name: string
  slug: string
}

export interface ProductVariant {
  id: string
  sku: string
  name: string
  amount: string
  bonus?: string
  priceOriginal: number
  priceDiscounted: number
  currency: string
  discount: number
  stock: {
    available: boolean
    quantity: number | null
    lowStockThreshold: number | null
  }
  isDefault?: boolean
  isBestValue?: boolean
  isPromotion?: boolean
  promotionLabel?: string
  promotionEndDate?: string
}

export interface DeliveryInfo {
  type: string
  estimatedTime: string
  method: string
}

export interface InfoNote {
  type: "warning" | "info" | "error" | "success"
  message: string
}

export interface OrderField {
  id: string
  name: string
  label: string
  placeholder: string
  type: string
  required: boolean
  validation?: {
    pattern: string
    errorMessage: string
  }
  helpText?: string
}

export interface OrderInformation {
  title: string
  fields: OrderField[]
}

export interface DescriptionSection {
  id: string
  heading: string
  text?: string
  features?: Array<{
    icon: string
    title: string
    description: string
  }>
  table?: {
    headers: string[]
    rows: Array<Record<string, string>>
  }
  callToAction?: string
  order: number
}

export interface ProductDescription {
  title: string
  content: string
  sections: DescriptionSection[]
}

export interface GuideStep {
  stepNumber: number
  title: string
  description: string
  image: string | null
}

export interface GuideNote {
  type: "warning" | "info" | "error"
  text: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ProductGuide {
  title: string
  steps: GuideStep[]
  notes: GuideNote[]
  videoUrl: string | null
  faqItems: FAQItem[]
}

export interface ReviewComment {
  id: string
  userId: string
  username: string
  rating: number
  comment: string
  additionalComment?: string
  date: string
  verified: boolean
  helpful: number
  images: string[]
}

export interface Reviews {
  enabled: boolean
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    "5": number
    "4": number
    "3": number
    "2": number
    "1": number
  }
  comments: ReviewComment[]
  sorting: string[]
}

export interface ProductSEO {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  canonicalUrl: string
}

export interface ProductPolicies {
  refundPolicy: string
  warrantyPeriod: string
  termsUrl: string
}

export interface ProductTimestamps {
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ProductPricing {
  baseCurrency: string
  supportedCurrencies: string[]
}

export interface Product {
  id: string
  slug: string
  sku: string
  title: string
  shortDescription: string
  image: string
  images: string[]
  category: ProductCategory
  subCategory: ProductCategory
  platform: string[]
  region: string
  excludedRegions: string[]
  tags: string[]
  status: string
  featured: boolean
  infoNote: InfoNote | null
  deliveryInfo: DeliveryInfo
  variantLabel: string
  variants: ProductVariant[]
  orderInformation: OrderInformation | null
  customFields: unknown[]
  pricing: ProductPricing
  description: ProductDescription
  guide: ProductGuide
  reviews: Reviews
  relatedProducts: string[]
  seo: ProductSEO
  policies: ProductPolicies
  timestamps: ProductTimestamps
}

export interface ProductData {
  products: Product[]
  metadata: {
    version: string
    lastUpdated: string
    apiEndpoints: Record<string, string>
  }
}


"use client"

import { 
  DollarSign, 
  Zap, 
  CreditCard, 
  Shield, 
  Headphones, 
  Globe,
  CheckCircle2
} from "lucide-react"
import type { Product } from "@/types/product"

interface ProductDescriptionProps {
  product: Product
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "dollar-sign": DollarSign,
  "zap": Zap,
  "credit-card": CreditCard,
  "shield": Shield,
  "headphones": Headphones,
  "globe": Globe,
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-8">
      {/* Main Description */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {product.description.title}
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          {product.description.content}
        </p>
      </div>

      {/* Description Sections */}
      {product.description.sections.map((section) => (
        <div key={section.id} className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            {section.heading}
          </h3>

          {section.text && (
            <p className="text-base text-muted-foreground leading-relaxed">
              {section.text}
            </p>
          )}

          {/* Features Grid */}
          {section.features && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {section.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon] || CheckCircle2
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="shrink-0 p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Table */}
          {section.table && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    {section.table.headers.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left text-sm font-semibold text-foreground"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      {Object.values(row).map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-4 py-3 text-sm text-muted-foreground"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Call to Action */}
          {section.callToAction && (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-foreground font-medium">
                {section.callToAction}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}


"use client"

import { 
  AlertTriangle, 
  Info, 
  CheckCircle2,
  ChevronRight
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { Product } from "@/types/product"

interface ProductGuideProps {
  product: Product
}

export function ProductGuide({ product }: ProductGuideProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">{product.guide.title}</h2>

      {/* Steps */}
      <div className="space-y-4">
        {product.guide.steps.map((step) => (
          <div key={step.stepNumber} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                {step.stepNumber}
              </div>
              {step.stepNumber < product.guide.steps.length && (
                <div className="h-full w-0.5 bg-border mt-2" />
              )}
            </div>
            <div className="flex-1 pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      {product.guide.notes.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-border">
          {product.guide.notes.map((note, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-lg border ${
                note.type === "warning"
                  ? "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
                  : note.type === "error"
                  ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                  : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
              }`}
            >
              {note.type === "warning" || note.type === "error" ? (
                <AlertTriangle
                  className={`h-5 w-5 shrink-0 mt-0.5 ${
                    note.type === "warning"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                />
              ) : (
                <Info className="h-5 w-5 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
              )}
              <p
                className={`text-sm ${
                  note.type === "warning"
                    ? "text-yellow-800 dark:text-yellow-200"
                    : note.type === "error"
                    ? "text-red-800 dark:text-red-200"
                    : "text-blue-800 dark:text-blue-200"
                }`}
              >
                {note.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* FAQ */}
      {product.guide.faqItems.length > 0 && (
        <div className="pt-4 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-2">
            {product.guide.faqItems.map((faq, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=open]:bg-accent">
                  <span className="text-foreground">{faq.question}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-3 text-sm text-muted-foreground">
                  {faq.answer}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


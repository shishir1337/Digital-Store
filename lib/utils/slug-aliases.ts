/**
 * Slug aliases mapping - maps alternative slugs to actual product slugs
 * This allows multiple URLs to point to the same product
 */
export const slugAliases: Record<string, string> = {
  // PUBG Mobile variations
  "pubgm-uc-global-code": "pubg-mobile-uc-global",
  "pubgm-uc-global": "pubg-mobile-uc-global",
  "pubg-uc-global": "pubg-mobile-uc-global",
  "pubg-mobile-uc": "pubg-mobile-uc-global",
  "pubgm-uc": "pubg-mobile-uc-global",
  
  // Valorant variations
  "valorant-vp-malaysia": "valorant-point-malaysia",
  "valorant-points-malaysia": "valorant-point-malaysia",
  "vp-malaysia": "valorant-point-malaysia",
}

/**
 * Resolve a slug to its canonical slug using aliases
 */
export function resolveSlugAlias(slug: string): string {
  return slugAliases[slug.toLowerCase()] || slug
}


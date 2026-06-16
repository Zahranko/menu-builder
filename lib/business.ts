import type { Tier } from './types'

// Reserved slugs that cannot be used by owners.
const RESERVED_SLUGS = new Set([
  'login', 'logout', 'signup', 'register',
  'api', 'admin', 'dashboard', 'settings',
  'www', 'mail', 'help', 'support', 'about',
  'terms', 'privacy', 'blog', 'app',
])

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$|^[a-z0-9]{2,50}$/

export function validateSlug(slug: string): string | null {
  if (!slug) return 'Slug is required.'
  if (slug !== slug.toLowerCase()) return 'Slug must be lowercase.'
  if (!SLUG_REGEX.test(slug)) return 'Slug must be 2–50 characters: lowercase letters, numbers, and hyphens only. Cannot start or end with a hyphen.'
  if (RESERVED_SLUGS.has(slug)) return `"${slug}" is a reserved word and cannot be used.`
  return null // valid
}

// Tier gating — add new tiers here; callers never need to know the tier strings.
export function canCustomize(tier: Tier): boolean {
  return tier === 't2' || tier === 't3'
}

export function canUseCustomDomain(tier: Tier): boolean {
  return tier === 't3'
}

export function canAddProducts(tier: Tier): boolean {
  // All tiers can add products.
  return true
}

// Publish rules — returns an error string if publishing should be blocked, null if OK.
export function validatePublish(site: { business_name: string; slug: string; hero_title: string }): string | null {
  if (!site.business_name.trim()) return 'Business name is required before publishing.'
  const slugError = validateSlug(site.slug)
  if (slugError) return slugError
  if (!site.hero_title.trim()) return 'Hero title is required before publishing.'
  return null
}

// Shared data contract — both the web dashboard and Flutter app read/write this shape.
// Any change here must be mirrored in the Dart models (Phase 5).

export type Tier = 'free' | 't2' | 't3'

export type TemplateId = 'template_1' | 'template_2'

export type CardStyle = 'card_a' | 'card_b'

export interface Site {
  id: string
  owner_id: string
  slug: string
  business_name: string
  template_id: TemplateId
  card_style: CardStyle
  bg_color: string
  bg_image_url: string | null
  logo_url: string | null
  hero_title: string
  hero_subtitle: string
  tier: Tier
  published: boolean
  created_at: string
}

export interface Product {
  id: string
  site_id: string
  name: string
  description: string
  price: number | null
  image_url: string | null
  sort_order: number
  created_at: string
}

// The data shape every template component receives — add nothing outside this contract.
export interface TemplateData {
  site: Site
  products: Product[]
}

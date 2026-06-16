'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { validateSlug, validatePublish, canCustomize } from '@/lib/business'
import type { Tier } from '@/lib/types'

export async function saveSettings(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: site } = await supabase
    .from('sites')
    .select('id, slug, tier')
    .eq('owner_id', user.id)
    .single()

  if (!site) redirect('/dashboard')

  const tier = site.tier as Tier
  const canCustom = canCustomize(tier)

  const slug = (formData.get('slug') as string).trim().toLowerCase()
  const slugError = validateSlug(slug)
  if (slugError) redirect(`/dashboard/site?error=${encodeURIComponent(slugError)}`)

  // If slug changed, check uniqueness
  if (slug !== site.slug) {
    const { data: existing } = await supabase
      .from('sites')
      .select('id')
      .eq('slug', slug)
      .neq('id', site.id)
      .single()
    if (existing) redirect(`/dashboard/site?error=${encodeURIComponent('That URL is already taken.')}`)
  }

  const updates: Record<string, unknown> = {
    slug,
    business_name:    (formData.get('business_name') as string).trim(),
    hero_title:       (formData.get('hero_title') as string).trim(),
    hero_subtitle:    (formData.get('hero_subtitle') as string).trim(),
    footer_text:      (formData.get('footer_text') as string).trim(),
    footer_hours:     (formData.get('footer_hours') as string).trim(),
    footer_address:   (formData.get('footer_address') as string).trim(),
    social_instagram: (formData.get('social_instagram') as string).trim(),
    social_facebook:  (formData.get('social_facebook') as string).trim(),
    social_twitter:   (formData.get('social_twitter') as string).trim(),
    social_tiktok:    (formData.get('social_tiktok') as string).trim(),
  }

  if (canCustom) {
    updates.template_id  = formData.get('template_id') as string
    updates.card_style   = formData.get('card_style') as string
    updates.bg_color     = formData.get('bg_color') as string || '#ffffff'
    updates.bg_image_url = (formData.get('bg_image_url') as string) || null
    updates.logo_url     = (formData.get('logo_url') as string) || null
  }

  const { error } = await supabase.from('sites').update(updates).eq('id', site.id)
  if (error) redirect(`/dashboard/site?error=${encodeURIComponent(error.message)}`)

  revalidatePath('/dashboard/site')
  revalidatePath(`/${slug}`)
  redirect('/dashboard/site?saved=1')
}

export async function togglePublish(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: site } = await supabase
    .from('sites')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!site) redirect('/dashboard')

  if (!site.published) {
    const err = validatePublish(site)
    if (err) redirect(`/dashboard/site?error=${encodeURIComponent(err)}`)
  }

  await supabase.from('sites').update({ published: !site.published }).eq('id', site.id)

  revalidatePath('/dashboard/site')
  revalidatePath('/dashboard')
  revalidatePath(`/${site.slug}`)
  redirect('/dashboard/site')
}

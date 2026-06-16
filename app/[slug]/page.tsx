import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getTemplate } from '@/templates/registry'
import type { TemplateId } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
}

async function getSiteData(slug: string) {
  const supabase = await createClient()

  const { data: site } = await supabase
    .from('sites')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!site) return null

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('site_id', site.id)
    .order('sort_order', { ascending: true })

  return { site, products: products ?? [] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getSiteData(slug)
  if (!data) return { title: 'Not found' }

  return {
    title: data.site.business_name || data.site.hero_title,
    description: data.site.hero_subtitle || undefined,
  }
}

export default async function PublicPage({ params }: Props) {
  const { slug } = await params
  const data = await getSiteData(slug)

  if (!data) notFound()

  const Template = getTemplate(data.site.template_id as TemplateId)

  return <Template site={data.site} products={data.products} />
}

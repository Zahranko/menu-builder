'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

async function getOwnedSiteId(): Promise<string | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase.from('sites').select('id').eq('owner_id', user.id).single()
  return data?.id ?? null
}

export async function addProduct(formData: FormData) {
  const supabase = await createClient()
  const siteId = await getOwnedSiteId()
  if (!siteId) redirect('/login')

  const { data: last } = await supabase
    .from('products')
    .select('sort_order')
    .eq('site_id', siteId)
    .order('sort_order', { ascending: false })
    .limit(1)
    .single()

  const sort_order = (last?.sort_order ?? -1) + 1

  const { error } = await supabase.from('products').insert({
    site_id: siteId,
    name:        (formData.get('name') as string).trim(),
    description: (formData.get('description') as string).trim(),
    price:       formData.get('price') ? Number(formData.get('price')) : null,
    image_url:   (formData.get('image_url') as string) || null,
    sort_order,
  })

  if (error) redirect(`/dashboard/products/new?error=${encodeURIComponent(error.message)}`)

  revalidatePath('/dashboard/products')
  redirect('/dashboard/products')
}

export async function updateProduct(formData: FormData) {
  const supabase = await createClient()
  const siteId = await getOwnedSiteId()
  if (!siteId) redirect('/login')

  const id = formData.get('id') as string

  const { error } = await supabase
    .from('products')
    .update({
      name:        (formData.get('name') as string).trim(),
      description: (formData.get('description') as string).trim(),
      price:       formData.get('price') ? Number(formData.get('price')) : null,
      image_url:   (formData.get('image_url') as string) || null,
    })
    .eq('id', id)
    .eq('site_id', siteId)

  if (error) redirect(`/dashboard/products/${id}/edit?error=${encodeURIComponent(error.message)}`)

  revalidatePath('/dashboard/products')
  redirect('/dashboard/products')
}

export async function deleteProduct(formData: FormData) {
  const supabase = await createClient()
  const siteId = await getOwnedSiteId()
  if (!siteId) redirect('/login')

  await supabase
    .from('products')
    .delete()
    .eq('id', formData.get('id') as string)
    .eq('site_id', siteId)

  revalidatePath('/dashboard/products')
}

export async function moveProduct(formData: FormData) {
  const supabase = await createClient()
  const siteId = await getOwnedSiteId()
  if (!siteId) redirect('/login')

  const id        = formData.get('id') as string
  const direction = formData.get('direction') as 'up' | 'down'

  const { data: products } = await supabase
    .from('products')
    .select('id, sort_order')
    .eq('site_id', siteId)
    .order('sort_order', { ascending: true })

  if (!products) return

  const idx = products.findIndex(p => p.id === id)
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= products.length) return

  const a = products[idx]
  const b = products[swapIdx]

  await Promise.all([
    supabase.from('products').update({ sort_order: b.sort_order }).eq('id', a.id),
    supabase.from('products').update({ sort_order: a.sort_order }).eq('id', b.id),
  ])

  revalidatePath('/dashboard/products')
}

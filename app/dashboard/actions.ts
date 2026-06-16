'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { validateSlug } from '@/lib/business'

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function createSite(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const slug = (formData.get('slug') as string).trim().toLowerCase()
  const business_name = (formData.get('business_name') as string).trim()

  const slugError = validateSlug(slug)
  if (slugError) redirect(`/dashboard?error=${encodeURIComponent(slugError)}`)

  const { error } = await supabase.from('sites').insert({
    owner_id: user.id,
    slug,
    business_name,
  })

  if (error) redirect(`/dashboard?error=${encodeURIComponent(error.message)}`)

  revalidatePath('/dashboard')
  redirect('/dashboard/site')
}

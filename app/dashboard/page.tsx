import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/dashboard/Nav'
import TierBadge from '@/components/dashboard/TierBadge'
import { createSite } from './actions'
import type { Tier } from '@/lib/types'

interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function DashboardHome({ searchParams }: Props) {
  const { error } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: site } = await supabase
    .from('sites')
    .select('*')
    .eq('owner_id', user!.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav activeHref="/dashboard" />
      <main className="max-w-3xl mx-auto px-4 py-10">

        {error && (
          <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {site ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-lg font-bold text-gray-900">
                    {site.business_name || 'My Menu'}
                  </h1>
                  <TierBadge tier={site.tier as Tier} />
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    site.published
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {site.published ? 'Live' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  ourdomain.com/<strong>{site.slug}</strong>
                </p>
              </div>

              {site.published && (
                <Link
                  href={`/${site.slug}`}
                  target="_blank"
                  className="text-sm text-blue-600 hover:underline shrink-0"
                >
                  View live →
                </Link>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dashboard/site"
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                Edit settings
              </Link>
              <Link
                href="/dashboard/products"
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Manage products
              </Link>
            </div>
          </div>
        ) : (
          /* No site yet — create flow */
          <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Create your menu</h1>
            <p className="text-sm text-gray-500 mb-6">
              Choose a URL and a name for your page.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business name
                </label>
                <input
                  name="business_name"
                  type="text"
                  required
                  placeholder="e.g. Joe's Burgers"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL slug
                </label>
                <div className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-gray-900">
                  <span className="text-gray-400 shrink-0">ourdomain.com/</span>
                  <input
                    name="slug"
                    type="text"
                    required
                    placeholder="joes-burgers"
                    className="flex-1 focus:outline-none min-w-0"
                  />
                </div>
              </div>
              <button
                formAction={createSite}
                className="w-full bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Create menu
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

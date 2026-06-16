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

  const { count } = site
    ? await supabase.from('products').select('*', { count: 'exact', head: true }).eq('site_id', site.id)
    : { count: 0 }

  return (
    <div className="min-h-screen bg-[#f9f9f8]">
      <Nav activeHref="/dashboard" />
      <main className="max-w-3xl mx-auto px-4 py-10">

        {error && (
          <div className="mb-6 animate-slide-up text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {site ? (
          <div className="animate-slide-up space-y-4">
            {/* Site card */}
            <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden">
              {/* Accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-gray-800 to-gray-500" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-lg font-bold text-gray-900">
                        {site.business_name || 'My Menu'}
                      </h1>
                      <TierBadge tier={site.tier as Tier} />
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                        site.published
                          ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${site.published ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {site.published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 font-mono">/{site.slug}</p>
                  </div>

                  {site.published && (
                    <Link
                      href={`/${site.slug}`}
                      target="_blank"
                      className="text-xs font-medium text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-lg px-3 py-1.5 transition-all duration-150 shrink-0"
                    >
                      View live ↗
                    </Link>
                  )}
                </div>

                {/* Stats row */}
                <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-6">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{count ?? 0}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Products</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{site.published ? '✓' : '–'}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Published</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="/dashboard/site"
                    className="px-4 py-2 bg-gray-950 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 shadow-sm"
                  >
                    Edit settings
                  </Link>
                  <Link
                    href="/dashboard/products"
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition-all duration-150 shadow-sm"
                  >
                    Manage products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* No site yet */
          <div className="animate-scale-in bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8 max-w-md">
            <div className="w-10 h-10 bg-gray-950 rounded-xl flex items-center justify-center mb-5">
              <span className="text-white font-black">M</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Create your menu</h1>
            <p className="text-sm text-gray-500 mb-6">Pick a URL and name to get started.</p>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business name</label>
                <input
                  name="business_name"
                  type="text"
                  required
                  placeholder="e.g. Joe's Burgers"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL slug</label>
                <div className="flex items-center rounded-xl border border-gray-200 bg-white shadow-sm px-4 py-2.5 text-sm focus-within:ring-2 focus-within:ring-gray-900 transition-shadow">
                  <span className="text-gray-400 shrink-0">ourdomain.com/</span>
                  <input
                    name="slug"
                    type="text"
                    required
                    placeholder="joes-burgers"
                    className="flex-1 focus:outline-none min-w-0 bg-transparent"
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-400">2–50 chars, lowercase, hyphens only.</p>
              </div>
              <button
                formAction={createSite}
                className="w-full bg-gray-950 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 shadow-sm"
              >
                Create menu →
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

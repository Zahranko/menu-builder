import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/dashboard/Nav'
import TierBadge from '@/components/dashboard/TierBadge'
import ImageUpload from '@/components/dashboard/ImageUpload'
import { saveSettings, togglePublish } from './actions'
import { canCustomize } from '@/lib/business'
import type { Tier } from '@/lib/types'

interface Props {
  searchParams: Promise<{ error?: string; saved?: string }>
}

export default async function SiteSettingsPage({ searchParams }: Props) {
  const { error, saved } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: site } = await supabase
    .from('sites')
    .select('*')
    .eq('owner_id', user!.id)
    .single()

  if (!site) redirect('/dashboard')

  const tier = site.tier as Tier
  const canCustom = canCustomize(tier)

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav activeHref="/dashboard/site" />
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-xl font-bold text-gray-900">Site settings</h1>
          <TierBadge tier={tier} />
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </div>
        )}
        {saved && (
          <div className="mb-6 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            Settings saved.
          </div>
        )}

        <form className="space-y-8">
          {/* Basic info — all tiers */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 text-sm">Basic info</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business name</label>
              <input
                name="business_name"
                defaultValue={site.business_name}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL slug</label>
              <div className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-gray-900">
                <span className="text-gray-400 shrink-0">ourdomain.com/</span>
                <input
                  name="slug"
                  defaultValue={site.slug}
                  required
                  className="flex-1 focus:outline-none min-w-0"
                />
              </div>
              <p className="text-xs text-gray-400">2–50 characters. Lowercase letters, numbers, hyphens only. No spaces.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page title</label>
              <input
                name="hero_title"
                defaultValue={site.hero_title}
                placeholder="e.g. Welcome to Joe's Burgers"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page subtitle</label>
              <input
                name="hero_subtitle"
                defaultValue={site.hero_subtitle}
                placeholder="e.g. Fresh burgers made daily"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </section>

          {/* Customize — t2+ only */}
          <section className={`bg-white rounded-2xl border p-6 space-y-5 ${canCustom ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 text-sm">Customize</h2>
              {!canCustom && (
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                  Upgrade to Pro to unlock
                </span>
              )}
            </div>
            <fieldset disabled={!canCustom} className="space-y-5">
              {/* Template picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                <div className="flex gap-3">
                  {(['template_1', 'template_2'] as const).map(id => (
                    <label key={id} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="template_id"
                        value={id}
                        defaultChecked={site.template_id === id}
                        className="sr-only peer"
                      />
                      <div className="border-2 rounded-xl p-3 text-center text-sm peer-checked:border-gray-900 border-gray-200 hover:border-gray-400 transition-colors">
                        <div className={`h-14 rounded-lg mb-2 ${id === 'template_1' ? 'bg-gray-100' : 'bg-gray-900'}`} />
                        <span className="font-medium text-gray-700">
                          {id === 'template_1' ? 'Light' : 'Dark'}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Card style picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card style</label>
                <div className="flex gap-3">
                  {(['card_a', 'card_b'] as const).map(style => (
                    <label key={style} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="card_style"
                        value={style}
                        defaultChecked={site.card_style === style}
                        className="sr-only peer"
                      />
                      <div className="border-2 rounded-xl p-3 text-center text-sm peer-checked:border-gray-900 border-gray-200 hover:border-gray-400 transition-colors">
                        <div className="h-10 rounded-lg mb-2 bg-gray-100 flex items-center justify-center">
                          {style === 'card_a'
                            ? <span className="text-xs text-gray-400">⊞ Grid</span>
                            : <span className="text-xs text-gray-400">☰ List</span>
                          }
                        </div>
                        <span className="font-medium text-gray-700">
                          {style === 'card_a' ? 'Grid' : 'List'}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Background color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="bg_color"
                    defaultValue={site.bg_color}
                    className="h-9 w-16 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                  />
                  <span className="text-xs text-gray-400">Overridden if a background image is set</span>
                </div>
              </div>

              {/* Image uploads */}
              <ImageUpload
                bucket="logos"
                currentUrl={site.logo_url}
                fieldName="logo_url"
                label="Logo"
              />
              <ImageUpload
                bucket="backgrounds"
                currentUrl={site.bg_image_url}
                fieldName="bg_image_url"
                label="Background image"
              />
            </fieldset>
          </section>

          {/* t3 custom domain placeholder */}
          {tier !== 't3' && (
            <section className="bg-white rounded-2xl border border-gray-100 p-6 opacity-60">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900 text-sm">Custom domain</h2>
                  <p className="text-xs text-gray-400 mt-0.5">yourbrand.com</p>
                </div>
                <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-medium">
                  Business plan · Coming soon
                </span>
              </div>
            </section>
          )}

          <button
            formAction={saveSettings}
            className="w-full bg-gray-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Save settings
          </button>
        </form>

        {/* Publish toggle — outside the settings form */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {site.published ? 'Your menu is live' : 'Your menu is a draft'}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {site.published
                ? `Visible at ourdomain.com/${site.slug}`
                : 'Not visible to the public yet'}
            </p>
          </div>
          <form>
            <button
              formAction={togglePublish}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                site.published
                  ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {site.published ? 'Unpublish' : 'Publish'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

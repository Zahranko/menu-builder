import type { TemplateData } from '@/lib/types'
import CardA from '../cards/CardA'
import CardB from '../cards/CardB'

export default function Template1({ site, products }: TemplateData) {
  const bgStyle = site.bg_image_url
    ? { backgroundImage: `url(${site.bg_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: site.bg_color }

  return (
    <div className="min-h-screen" style={bgStyle}>
      {/* Hero */}
      <header className="flex flex-col items-center text-center px-6 pt-16 pb-12 gap-4">
        {site.logo_url && (
          <img
            src={site.logo_url}
            alt={site.business_name}
            className="w-20 h-20 rounded-full object-cover shadow"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{site.hero_title}</h1>
          {site.hero_subtitle && (
            <p className="mt-2 text-base text-gray-600 max-w-sm mx-auto">{site.hero_subtitle}</p>
          )}
        </div>
      </header>

      {/* Products */}
      <main className="max-w-2xl mx-auto px-4 pb-16">
        {products.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-8">No items yet.</p>
        ) : site.card_style === 'card_a' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {products.map(p => <CardA key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="bg-white rounded-2xl px-4 shadow-sm">
            {products.map(p => <CardB key={p.id} product={p} />)}
          </div>
        )}
      </main>

      <footer className="text-center pb-8 text-xs text-gray-400">
        Powered by Menu Builder
      </footer>
    </div>
  )
}

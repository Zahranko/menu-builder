import type { TemplateData } from '@/lib/types'
import CardA from '../cards/CardA'
import CardB from '../cards/CardB'

export default function Template2({ site, products }: TemplateData) {
  const hasBgImage = !!site.bg_image_url

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header band */}
      <header
        className="relative px-6 py-14 overflow-hidden"
        style={
          hasBgImage
            ? { backgroundImage: `url(${site.bg_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { backgroundColor: site.bg_color }
        }
      >
        {hasBgImage && <div className="absolute inset-0 bg-black/50" />}
        <div className="relative max-w-3xl mx-auto flex items-center gap-6">
          {site.logo_url && (
            <img
              src={site.logo_url}
              alt={site.business_name}
              className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-lg"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold leading-tight drop-shadow">{site.hero_title}</h1>
            {site.hero_subtitle && (
              <p className="mt-1 text-sm text-white/80 max-w-md">{site.hero_subtitle}</p>
            )}
          </div>
        </div>
      </header>

      {/* Products */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">
          Menu
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-500 text-sm">No items yet.</p>
        ) : site.card_style === 'card_a' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {products.map(p => (
              <div key={p.id} className="bg-gray-900 rounded-2xl overflow-hidden">
                <CardA product={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-2xl px-4 divide-y divide-gray-800">
            {products.map(p => (
              <div key={p.id} className="text-white [&_h3]:text-white [&_p]:text-gray-400 [&_span]:text-gray-200">
                <CardB product={p} />
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center pb-8 text-xs text-gray-600">
        Powered by Menu Builder
      </footer>
    </div>
  )
}

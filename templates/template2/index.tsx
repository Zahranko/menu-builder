import type { TemplateData } from '@/lib/types'
import CardA from '../cards/CardA'
import CardB from '../cards/CardB'

export default function Template2({ site, products }: TemplateData) {
  const hasBg = !!site.bg_image_url

  const headerBg = hasBg
    ? { backgroundImage: `url(${site.bg_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: site.bg_color }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero header */}
      <header className="relative overflow-hidden" style={headerBg}>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-950" />

        <div className="relative max-w-3xl mx-auto px-6 pt-14 pb-16">
          <div className="flex items-end gap-5">
            {site.logo_url && (
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 shrink-0">
                <img src={site.logo_url} alt={site.business_name} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight drop-shadow-lg">
                {site.hero_title || site.business_name}
              </h1>
              {site.hero_subtitle && (
                <p className="mt-1.5 text-white/70 text-sm max-w-md leading-relaxed">
                  {site.hero_subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Products */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        {products.length === 0 ? (
          <p className="text-gray-600 text-sm py-12 text-center">No items yet.</p>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">Menu</p>
            {site.card_style === 'card_a' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((p, i) => (
                  <div
                    key={p.id}
                    className="animate-slide-up [&_.group]:bg-gray-900 [&_.group]:border-white/[0.06] [&_h3]:text-white [&_p]:text-gray-400"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <CardA product={p} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-900 rounded-2xl border border-white/[0.06] px-4">
                {products.map(p => (
                  <div key={p.id} className="[&_h3]:text-white [&_p]:text-gray-400 [&_span]:text-gray-200 [&_.group]:border-gray-800 [&_.group:hover]:bg-gray-800/60">
                    <CardB product={p} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="text-center pb-10 text-xs text-gray-700 tracking-wide">
        Powered by Menu Builder
      </footer>
    </div>
  )
}

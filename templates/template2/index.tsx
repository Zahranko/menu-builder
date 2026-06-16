import type { TemplateData } from '@/lib/types'
import CardA from '../cards/CardA'
import CardB from '../cards/CardB'

export default function Template2({ site, products }: TemplateData) {
  const hasBgImage = !!site.bg_image_url
  const heroBg = hasBgImage
    ? { backgroundImage: `url(${site.bg_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: site.bg_color }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">

      {/* ── Header bar ── */}
      <header className="bg-gray-950/90 border-b border-white/[0.06] sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {site.logo_url ? (
              <img
                src={site.logo_url}
                alt={site.business_name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xs">
                  {(site.business_name || 'M').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="font-semibold text-white text-sm tracking-tight">
              {site.business_name || 'Our Menu'}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-medium hidden sm:block">Menu</span>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={heroBg}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-950" />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-14">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight drop-shadow-lg">
            {site.hero_title || site.business_name || 'Welcome'}
          </h1>
          {site.hero_subtitle && (
            <p className="mt-3 text-white/70 text-base max-w-md leading-relaxed">
              {site.hero_subtitle}
            </p>
          )}
        </div>
      </section>

      {/* ── Products ── */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
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

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] bg-gray-900/50 mt-auto">
        <div className="max-w-3xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            {site.logo_url ? (
              <img src={site.logo_url} alt={site.business_name} className="w-6 h-6 rounded-md object-cover ring-1 ring-white/10" />
            ) : (
              <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">{(site.business_name || 'M').charAt(0).toUpperCase()}</span>
              </div>
            )}
            <span className="text-sm font-semibold text-gray-300">{site.business_name || 'Our Menu'}</span>
          </div>

          {site.footer_text && (
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">{site.footer_text}</p>
          )}

          <p className="text-xs text-gray-700 shrink-0">Powered by Menu Builder</p>
        </div>
      </footer>
    </div>
  )
}

import type { TemplateData } from '@/lib/types'
import CardA from '../cards/CardA'
import CardB from '../cards/CardB'

export default function Template1({ site, products }: TemplateData) {
  const hasBgImage = !!site.bg_image_url
  const heroStyle = hasBgImage
    ? { backgroundImage: `url(${site.bg_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: site.bg_color }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">

      {/* ── Header bar ── */}
      <header className="bg-white border-b border-black/[0.06] sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {site.logo_url ? (
              <img
                src={site.logo_url}
                alt={site.business_name}
                className="w-8 h-8 rounded-lg object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xs">
                  {(site.business_name || 'M').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="font-semibold text-gray-900 text-sm tracking-tight">
              {site.business_name || 'Our Menu'}
            </span>
          </div>
          <span className="text-xs text-gray-400 font-medium hidden sm:block">Menu</span>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={heroStyle}>
        {hasBgImage && <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />}
        <div className="relative flex flex-col items-center text-center px-6 pt-14 pb-12 gap-4">
          <div>
            <h1 className={`text-3xl sm:text-4xl font-bold leading-tight tracking-tight ${hasBgImage ? 'text-white drop-shadow-md' : 'text-gray-900'}`}>
              {site.hero_title || site.business_name || 'Welcome'}
            </h1>
            {site.hero_subtitle && (
              <p className={`mt-2.5 text-base max-w-sm mx-auto leading-relaxed ${hasBgImage ? 'text-white/85' : 'text-gray-500'}`}>
                {site.hero_subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        {products.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-12">No items yet.</p>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Menu</p>
            {site.card_style === 'card_a' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {products.map((p, i) => (
                  <div key={p.id} className="animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                    <CardA product={p} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-black/[0.05] shadow-sm px-4">
                {products.map(p => <CardB key={p.id} product={p} />)}
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-white mt-auto">
        <div className="max-w-2xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            {site.logo_url ? (
              <img src={site.logo_url} alt={site.business_name} className="w-6 h-6 rounded-md object-cover" />
            ) : (
              <div className="w-6 h-6 rounded-md bg-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">{(site.business_name || 'M').charAt(0).toUpperCase()}</span>
              </div>
            )}
            <span className="text-sm font-semibold text-gray-700">{site.business_name || 'Our Menu'}</span>
          </div>

          {site.footer_text && (
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">{site.footer_text}</p>
          )}

          <p className="text-xs text-gray-300 shrink-0">Powered by Menu Builder</p>
        </div>
      </footer>
    </div>
  )
}

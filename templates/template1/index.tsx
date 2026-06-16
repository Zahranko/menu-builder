import type { TemplateData } from '@/lib/types'
import CardA from '../cards/CardA'
import CardB from '../cards/CardB'

export default function Template1({ site, products }: TemplateData) {
  const hasBg = !!site.bg_image_url
  const heroStyle = hasBg
    ? { backgroundImage: `url(${site.bg_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: site.bg_color }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero */}
      <header className="relative overflow-hidden" style={heroStyle}>
        {hasBg && <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />}
        <div className="relative flex flex-col items-center text-center px-6 pt-16 pb-14 gap-5">
          {site.logo_url && (
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white/30">
              <img src={site.logo_url} alt={site.business_name} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className={`text-3xl sm:text-4xl font-bold leading-tight tracking-tight ${hasBg ? 'text-white drop-shadow-md' : 'text-gray-900'}`}>
              {site.hero_title || site.business_name}
            </h1>
            {site.hero_subtitle && (
              <p className={`mt-2 text-base max-w-sm mx-auto leading-relaxed ${hasBg ? 'text-white/85' : 'text-gray-500'}`}>
                {site.hero_subtitle}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Products */}
      <main className="max-w-2xl mx-auto px-4 py-10">
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

      <footer className="text-center pb-10 text-xs text-gray-300 tracking-wide">
        Powered by Menu Builder
      </footer>
    </div>
  )
}

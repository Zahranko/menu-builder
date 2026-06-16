import type { TemplateData } from '@/lib/types'
import CardA from '../cards/CardA'
import CardB from '../cards/CardB'

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function FbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z"/>
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export default function Template2({ site, products }: TemplateData) {
  const hasBgImage = !!site.bg_image_url
  const heroBg = hasBgImage
    ? { backgroundImage: `url(${site.bg_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: site.bg_color }

  const socialLinks = [
    { url: site.social_instagram, icon: <IgIcon />, label: 'Instagram' },
    { url: site.social_facebook,  icon: <FbIcon />, label: 'Facebook' },
    { url: site.social_twitter,   icon: <XIcon />,  label: 'X / Twitter' },
    { url: site.social_tiktok,    icon: <TikTokIcon />, label: 'TikTok' },
  ].filter(s => s.url)

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
                className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/10"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">
                  {(site.business_name || 'M').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="font-semibold text-white text-sm tracking-tight">
              {site.business_name || 'Our Menu'}
            </span>
          </div>
          <a
            href="#products"
            className="text-xs font-medium text-gray-500 hover:text-gray-200 transition-colors hidden sm:block"
          >
            View menu ↓
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={heroBg}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-950" />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-14 flex flex-col gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight drop-shadow-lg">
              {site.hero_title || site.business_name || 'Welcome'}
            </h1>
            {site.hero_subtitle && (
              <p className="text-white/70 text-base sm:text-lg max-w-md leading-relaxed">
                {site.hero_subtitle}
              </p>
            )}
          </div>
          <div>
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-white text-gray-900 hover:bg-gray-100 shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              See the menu
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <main id="products" className="flex-1 max-w-3xl mx-auto w-full px-4 py-10 scroll-mt-14">
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
      <footer className="border-t border-white/[0.06] bg-gray-900/40 mt-auto">
        <div className="max-w-3xl mx-auto px-5 py-10">
          {/* Top row: brand + info + socials */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            {/* Brand */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                {site.logo_url ? (
                  <img src={site.logo_url} alt={site.business_name} className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{(site.business_name || 'M').charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <span className="font-semibold text-gray-200 text-sm">{site.business_name || 'Our Menu'}</span>
              </div>
              {site.footer_text && (
                <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">{site.footer_text}</p>
              )}
            </div>

            {/* Info columns */}
            <div className="flex flex-col sm:flex-row gap-6 text-xs text-gray-500">
              {site.footer_hours && (
                <div className="space-y-1">
                  <p className="font-semibold text-gray-400 uppercase tracking-wider text-[10px]">Hours</p>
                  <div className="flex items-start gap-1.5">
                    <ClockIcon />
                    <span className="leading-relaxed">{site.footer_hours}</span>
                  </div>
                </div>
              )}
              {site.footer_address && (
                <div className="space-y-1">
                  <p className="font-semibold text-gray-400 uppercase tracking-wider text-[10px]">Location</p>
                  <div className="flex items-start gap-1.5">
                    <MapPinIcon />
                    <span className="leading-relaxed">{site.footer_address}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="space-y-1">
                <p className="font-semibold text-gray-400 uppercase tracking-wider text-[10px]">Follow us</p>
                <div className="flex items-center gap-2 mt-1">
                  {socialLinks.map(s => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom divider + branding */}
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <p className="text-xs text-gray-700">Powered by Menu Builder</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

import Link from 'next/link'
import { logout } from '@/app/dashboard/actions'

interface Props { activeHref?: string }

const links = [
  { href: '/dashboard',          label: 'Home'     },
  { href: '/dashboard/site',     label: 'Settings' },
  { href: '/dashboard/products', label: 'Products' },
]

export default function Nav({ activeHref }: Props) {
  return (
    <nav className="sticky top-0 z-20 border-b border-black/[0.06] bg-white/80 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between h-13">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-950 rounded-md flex items-center justify-center shrink-0">
              <span className="text-white font-black text-xs">M</span>
            </div>
            <span className="font-semibold text-sm text-gray-900 hidden sm:block">Menu Builder</span>
          </div>

          {/* Links — hidden on xs, inline on sm+ */}
          <div className="hidden sm:flex items-center gap-0.5 bg-gray-100 rounded-xl p-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  activeHref === l.href
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <form>
            <button
              formAction={logout}
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
            >
              Log out
            </button>
          </form>
        </div>

        {/* Mobile nav links */}
        <div className="flex sm:hidden items-center gap-0.5 bg-gray-100 rounded-xl p-1 mb-2">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex-1 text-center px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                activeHref === l.href
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

import Link from 'next/link'
import { logout } from '@/app/dashboard/actions'

interface Props {
  activeHref?: string
}

const links = [
  { href: '/dashboard', label: 'Home' },
  { href: '/dashboard/site', label: 'Settings' },
  { href: '/dashboard/products', label: 'Products' },
]

export default function Nav({ activeHref }: Props) {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Single row on md+, split into two rows on mobile */}
        <div className="flex items-center justify-between h-12">
          <span className="font-bold text-gray-900 text-sm shrink-0">Menu Builder</span>

          {/* Links hidden on xs, shown inline on sm+ */}
          <div className="hidden sm:flex gap-1 mx-4">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeHref === l.href
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <form className="shrink-0">
            <button
              formAction={logout}
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              Log out
            </button>
          </form>
        </div>

        {/* Mobile-only second row for links */}
        <div className="flex sm:hidden gap-1 pb-2 overflow-x-auto">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                activeHref === l.href
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
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

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
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <span className="font-bold text-gray-900 text-sm">Menu Builder</span>
          <div className="flex gap-1">
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
        </div>
        <form>
          <button
            formAction={logout}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            Log out
          </button>
        </form>
      </div>
    </nav>
  )
}

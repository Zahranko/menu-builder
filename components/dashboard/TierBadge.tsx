import type { Tier } from '@/lib/types'

const LABELS: Record<Tier, string> = {
  free: 'Free',
  t2: 'Pro · $3/mo',
  t3: 'Business · $7/mo',
}

const COLORS: Record<Tier, string> = {
  free: 'bg-gray-100 text-gray-600',
  t2: 'bg-blue-50 text-blue-700',
  t3: 'bg-purple-50 text-purple-700',
}

export default function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${COLORS[tier]}`}>
      {LABELS[tier]}
    </span>
  )
}

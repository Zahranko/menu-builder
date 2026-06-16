import type { Product } from '@/lib/types'

export default function CardB({ product }: { product: Product }) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      {product.image_url && (
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col justify-center gap-1 flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h3>
          {product.price != null && (
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              ${Number(product.price).toFixed(2)}
            </span>
          )}
        </div>
        {product.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{product.description}</p>
        )}
      </div>
    </div>
  )
}

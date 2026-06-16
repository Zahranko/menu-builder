import type { Product } from '@/lib/types'

export default function CardB({ product }: { product: Product }) {
  return (
    <div className="group flex gap-4 py-4 border-b border-gray-100 last:border-0 transition-colors duration-150 hover:bg-gray-50/60 -mx-4 px-4">
      <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden bg-gray-100 shrink-0">
        <img
          src={product.image_url ?? '/product-placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center gap-1 flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h3>
          {product.price != null && (
            <span className="text-sm font-bold text-gray-800 whitespace-nowrap tabular-nums shrink-0">
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

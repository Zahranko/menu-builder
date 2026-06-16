import type { Product } from '@/lib/types'

export default function CardA({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.05] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={product.image_url ?? '/product-placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{product.name}</h3>
          {product.price != null && (
            <span className="text-sm font-bold text-gray-900 whitespace-nowrap tabular-nums shrink-0">
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

import type { Product } from '@/lib/types'

export default function CardA({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      {product.image_url && (
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{product.name}</h3>
          {product.price != null && (
            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
              ${Number(product.price).toFixed(2)}
            </span>
          )}
        </div>
        {product.description && (
          <p className="text-xs text-gray-500 leading-relaxed">{product.description}</p>
        )}
      </div>
    </div>
  )
}

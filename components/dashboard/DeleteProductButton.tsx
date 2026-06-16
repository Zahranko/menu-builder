'use client'

import { deleteProduct } from '@/app/dashboard/products/actions'

export default function DeleteProductButton({ productId }: { productId: string }) {
  return (
    <form>
      <input type="hidden" name="id" value={productId} />
      <button
        formAction={deleteProduct}
        className="text-xs text-red-400 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
        onClick={e => {
          if (!confirm('Delete this product?')) e.preventDefault()
        }}
      >
        Delete
      </button>
    </form>
  )
}

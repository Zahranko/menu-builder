import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/dashboard/Nav'
import DeleteProductButton from '@/components/dashboard/DeleteProductButton'
import { moveProduct } from './actions'
import type { Product } from '@/lib/types'

interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const { error } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: site } = await supabase
    .from('sites')
    .select('id')
    .eq('owner_id', user!.id)
    .single()

  if (!site) redirect('/dashboard')

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('site_id', site.id)
    .order('sort_order', { ascending: true })

  const list: Product[] = products ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav activeHref="/dashboard/products" />
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-gray-900">Products</h1>
          <Link
            href="/dashboard/products/new"
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            + Add product
          </Link>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {list.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-gray-400 text-sm">No products yet.</p>
            <Link
              href="/dashboard/products/new"
              className="mt-4 inline-block text-sm text-gray-700 underline underline-offset-2"
            >
              Add your first product →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
            {list.map((product, idx) => (
              <div key={product.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Image + name/description */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 bg-gray-100"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-400 truncate">{product.description}</p>
                  </div>
                  {product.price != null && (
                    <span className="text-sm font-semibold text-gray-700 shrink-0 sm:hidden">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Actions row */}
                <div className="flex items-center gap-3 shrink-0">
                  {product.price != null && (
                    <span className="text-sm font-semibold text-gray-700 hidden sm:inline">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  )}

                  {/* Reorder buttons */}
                  <div className="flex gap-1">
                    <form>
                      <input type="hidden" name="id" value={product.id} />
                      <input type="hidden" name="direction" value="up" />
                      <button
                        formAction={moveProduct}
                        disabled={idx === 0}
                        className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-20 text-xs transition-colors"
                        aria-label="Move up"
                      >
                        ▲
                      </button>
                    </form>
                    <form>
                      <input type="hidden" name="id" value={product.id} />
                      <input type="hidden" name="direction" value="down" />
                      <button
                        formAction={moveProduct}
                        disabled={idx === list.length - 1}
                        className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-20 text-xs transition-colors"
                        aria-label="Move down"
                      >
                        ▼
                      </button>
                    </form>
                  </div>

                  <Link
                    href={`/dashboard/products/${product.id}/edit`}
                    className="text-xs text-gray-500 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    Edit
                  </Link>

                  <DeleteProductButton productId={product.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

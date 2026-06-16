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
    <div className="min-h-screen bg-[#f9f9f8]">
      <Nav activeHref="/dashboard/products" />
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Products</h1>
            <p className="text-sm text-gray-400 mt-0.5">{list.length} item{list.length !== 1 ? 's' : ''}</p>
          </div>
          <Link
            href="/dashboard/products/new"
            className="px-4 py-2 bg-gray-950 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 shadow-sm"
          >
            + Add product
          </Link>
        </div>

        {error && (
          <div className="mb-6 animate-slide-up text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {list.length === 0 ? (
          <div className="animate-scale-in bg-white rounded-2xl border border-black/[0.06] shadow-sm p-16 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍽</span>
            </div>
            <p className="font-medium text-gray-700">No products yet</p>
            <p className="text-sm text-gray-400 mt-1">Add your first item to the menu.</p>
            <Link
              href="/dashboard/products/new"
              className="mt-5 inline-block px-4 py-2 bg-gray-950 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-sm"
            >
              Add product →
            </Link>
          </div>
        ) : (
          <div className="animate-slide-up bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden">
            {list.map((product, idx) => (
              <div
                key={product.id}
                className="flex items-center gap-4 px-4 py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors duration-100"
              >
                <img
                  src={product.image_url ?? '/product-placeholder.svg'}
                  alt={product.name}
                  className="w-11 h-11 rounded-xl object-cover shrink-0 bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
                  {product.description && (
                    <p className="text-xs text-gray-400 truncate mt-0.5">{product.description}</p>
                  )}
                </div>

                {product.price != null && (
                  <span className="text-sm font-semibold text-gray-700 shrink-0 tabular-nums">
                    ${Number(product.price).toFixed(2)}
                  </span>
                )}

                {/* Reorder */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <form>
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="direction" value="up" />
                    <button
                      formAction={moveProduct}
                      disabled={idx === 0}
                      className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-20 text-xs transition-all"
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
                      className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-20 text-xs transition-all"
                    >
                      ▼
                    </button>
                  </form>
                </div>

                <Link
                  href={`/dashboard/products/${product.id}/edit`}
                  className="text-xs font-medium text-gray-400 hover:text-gray-900 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-all shrink-0"
                >
                  Edit
                </Link>
                <DeleteProductButton productId={product.id} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

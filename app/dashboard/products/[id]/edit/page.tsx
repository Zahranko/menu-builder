import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/dashboard/Nav'
import ImageUpload from '@/components/dashboard/ImageUpload'
import { updateProduct } from '../../actions'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}

export default async function EditProductPage({ params, searchParams }: Props) {
  const { id } = await params
  const { error } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: site } = await supabase
    .from('sites')
    .select('id')
    .eq('owner_id', user!.id)
    .single()

  if (!site) redirect('/dashboard')

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('site_id', site.id)
    .single()

  if (!product) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav activeHref="/dashboard/products" />
      <main className="max-w-xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard/products" className="text-gray-400 hover:text-gray-700 text-sm">
            ← Products
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Edit product</h1>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <form className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <input type="hidden" name="id" value={product.id} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              name="name"
              required
              defaultValue={product.name}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={product.description}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <div className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-gray-900 w-32">
              <span className="text-gray-400">$</span>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue={product.price ?? ''}
                placeholder="0.00"
                className="flex-1 focus:outline-none min-w-0"
              />
            </div>
          </div>
          <ImageUpload
            bucket="logos"
            currentUrl={product.image_url}
            fieldName="image_url"
            label="Product image"
          />
          <div className="flex gap-3 pt-2">
            <button
              formAction={updateProduct}
              className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Save changes
            </button>
            <Link
              href="/dashboard/products"
              className="flex-1 text-center border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

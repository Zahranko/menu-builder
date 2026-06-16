import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from './actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <form>
            <button
              formAction={logout}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Log out
            </button>
          </form>
        </div>
        <p className="text-gray-600">Signed in as <strong>{user.email}</strong></p>
        <p className="mt-4 text-sm text-gray-400">Dashboard coming in Phase 3.</p>
      </div>
    </main>
  )
}

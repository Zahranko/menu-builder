import { login, signup } from './actions'

interface Props {
  searchParams: Promise<{ error?: string; info?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { error, info } = await searchParams

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-gray-950 text-white p-12">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
            <span className="text-gray-950 font-black text-sm">M</span>
          </div>
          <span className="font-semibold tracking-tight">Menu Builder</span>
        </div>
        <div>
          <blockquote className="text-2xl font-medium leading-snug text-white/90">
            "A beautiful menu page for your business — live in minutes."
          </blockquote>
          <p className="mt-6 text-sm text-white/40">Free to start. No credit card required.</p>
        </div>
        <p className="text-xs text-white/20">© 2026 Menu Builder</p>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center bg-[#f9f9f8] px-6 py-16">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-7 h-7 bg-gray-950 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">M</span>
            </div>
            <span className="font-semibold tracking-tight text-gray-900">Menu Builder</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-8">Sign in to your account or create a new one.</p>

          {error && (
            <div className="mb-5 animate-slide-up text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          {info && (
            <div className="mb-5 animate-slide-up text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              {info}
            </div>
          )}

          <form className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                formAction={login}
                className="w-full bg-gray-950 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 shadow-sm"
              >
                Sign in
              </button>
              <button
                formAction={signup}
                className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all duration-150 shadow-sm"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

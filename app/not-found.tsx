import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f9f9f8] px-4">
      <div className="text-center animate-scale-in">
        <p className="text-8xl font-black text-gray-100 select-none leading-none">404</p>
        <h1 className="mt-4 text-xl font-bold text-gray-800">Page not found</h1>
        <p className="mt-2 text-sm text-gray-400 max-w-xs mx-auto">
          This menu doesn&apos;t exist or hasn&apos;t been published yet.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex items-center gap-1.5 px-5 py-2.5 bg-gray-950 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm"
        >
          Create your own menu →
        </Link>
      </div>
    </main>
  )
}

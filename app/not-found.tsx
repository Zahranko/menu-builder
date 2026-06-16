import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <p className="text-5xl font-bold text-gray-200">404</p>
        <h1 className="mt-3 text-xl font-semibold text-gray-800">Page not found</h1>
        <p className="mt-2 text-sm text-gray-500">
          This menu doesn&apos;t exist or hasn&apos;t been published yet.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-sm text-gray-500 underline underline-offset-2 hover:text-gray-800"
        >
          Create your own menu →
        </Link>
      </div>
    </main>
  )
}

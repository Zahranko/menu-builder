export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9f9f8]">
      <div className="border-b border-black/[0.06] bg-white/80 h-13" />
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        <div className="h-6 w-32 skeleton rounded-xl" />
        <div className="h-48 skeleton rounded-2xl" />
      </div>
    </div>
  )
}

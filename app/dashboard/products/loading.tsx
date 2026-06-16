export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9f9f8]">
      <div className="border-b border-black/[0.06] bg-white/80 h-13" />
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
        <div className="flex justify-between items-center">
          <div className="h-6 w-24 skeleton rounded-xl" />
          <div className="h-9 w-28 skeleton rounded-xl" />
        </div>
        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden divide-y divide-gray-100">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3.5">
              <div className="w-11 h-11 skeleton rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-40 skeleton rounded-lg" />
                <div className="h-3 w-24 skeleton rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

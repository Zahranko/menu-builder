export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white h-12" />
      <div className="max-w-2xl mx-auto px-4 py-10 animate-pulse space-y-4">
        <div className="flex justify-between">
          <div className="h-6 w-28 bg-gray-200 rounded-lg" />
          <div className="h-9 w-28 bg-gray-200 rounded-lg" />
        </div>
        <div className="bg-gray-200 rounded-2xl h-64" />
      </div>
    </div>
  )
}

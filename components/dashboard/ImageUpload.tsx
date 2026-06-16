'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  bucket: 'logos' | 'backgrounds'
  currentUrl: string | null
  fieldName: string
  label: string
}

export default function ImageUpload({ bucket, currentUrl, fieldName, label }: Props) {
  const [url, setUrl] = useState<string | null>(currentUrl)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('File must be under 5 MB.')
      return
    }

    setError(null)
    setUploading(true)

    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    setUrl(data.publicUrl)
    setUploading(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {/* Hidden field carries the URL into the server action form */}
      <input type="hidden" name={fieldName} value={url ?? ''} />

      <div className="flex items-center gap-3">
        {url && (
          <img
            src={url}
            alt=""
            className="w-14 h-14 rounded-lg object-cover border border-gray-200"
          />
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          {uploading ? 'Uploading…' : url ? 'Change' : 'Upload'}
        </button>
        {url && (
          <button
            type="button"
            onClick={() => setUrl(null)}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

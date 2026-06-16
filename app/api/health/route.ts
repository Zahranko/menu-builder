import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  // getSession() requires no tables — a null session with no error means we reached Supabase.
  const { error } = await supabase.auth.getSession()
  return NextResponse.json({ connected: !error, error: error?.message ?? null })
}

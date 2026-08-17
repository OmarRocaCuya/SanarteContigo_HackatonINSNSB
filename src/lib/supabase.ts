// Supabase client — configure .env.local with your project credentials
// See .env.local.example for required variables

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Lazy-loaded client to avoid errors when env vars are not set (demo mode)
let _supabase: import('@supabase/supabase-js').SupabaseClient | null = null

export async function getSupabase() {
  if (!isSupabaseConfigured) return null
  if (!_supabase) {
    const { createClient } = await import('@supabase/supabase-js')
    _supabase = createClient(supabaseUrl!, supabaseAnonKey!)
  }
  return _supabase
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''
const isConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('xyz'))

export const supabase = createClient(supabaseUrl || 'https://example.supabase.co', supabaseAnonKey || 'public-anon-key', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

export const supabaseConfig = {
  isConfigured,
  storageBucket: import.meta.env.VITE_SUPABASE_STORAGE_BUCKET ?? 'public-assets',
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://dercfslfnrlqosuqofwa.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlcmNmc2xmbnJscW9zdXFvZndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MTI2MDYsImV4cCI6MjA1MjI4ODYwNn0.xSyL-7I7H4-PpkaHZ9tm6EZw9u8jCQuMM73PpPYKudU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storageKey: 'mycitymove-auth-token',
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    enabled: false
  }
}) 
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dercfslfnrlqosuqofwa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlcmNmc2xmbnJscW9zdXFvZndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MTI2MDYsImV4cCI6MjA1MjI4ODYwNn0.xSyL-7I7H4-PpkaHZ9tm6EZw9u8jCQuMM73PpPYKudU'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testSupabaseConnection() {
  try {
    // Test simple de connexion
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)

    if (error) {
      console.error('❌ Erreur de connexion Supabase:', error.message)
      return false
    }

    console.log('✅ Connexion Supabase réussie!')
    console.log('Données reçues:', data)
    return true
  } catch (error) {
    console.error('❌ Erreur inattendue:', error)
    return false
  }
}

// Exécuter le test
testSupabaseConnection() 
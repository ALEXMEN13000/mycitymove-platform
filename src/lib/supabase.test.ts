import { supabase } from './supabase'

async function testConnection() {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1)
    
    if (error) {
      console.error('❌ Erreur de connexion:', error.message)
      return false
    }
    
    console.log('✅ Connexion à Supabase réussie!')
    return true
  } catch (err) {
    console.error('❌ Erreur:', err)
    return false
  }
}

testConnection() 
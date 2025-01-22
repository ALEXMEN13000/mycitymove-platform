import { supabase } from './supabase'

async function testLogin() {
  try {
    console.log('Test de connexion utilisateur...')
    // Test connexion utilisateur
    const { data: userData, error: userError } = await supabase.auth.signInWithPassword({
      email: 'test4@example.com',
      password: 'test123456'
    })

    if (userError) throw userError
    console.log('✅ Connexion utilisateur réussie')
    console.log('ID utilisateur:', userData.user?.id)

    // Vérifier les données de l'utilisateur
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userData.user?.id)
      .single()

    if (profileError) throw profileError
    console.log('Profil utilisateur:', userProfile)

    // Déconnexion
    await supabase.auth.signOut()
    console.log('Déconnexion utilisateur')

    console.log('\nTest de connexion club...')
    // Test connexion club
    const { data: clubData, error: clubError } = await supabase.auth.signInWithPassword({
      email: 'club4@example.com',
      password: 'club123456'
    })

    if (clubError) throw clubError
    console.log('✅ Connexion club réussie')
    console.log('ID club:', clubData.user?.id)

    // Vérifier les données du club
    const { data: clubProfile, error: clubProfileError } = await supabase
      .from('clubs')
      .select('*')
      .eq('id', clubData.user?.id)
      .single()

    if (clubProfileError) throw clubProfileError
    console.log('Profil club:', clubProfile)

    // Vérifier les adhésions du club
    const { data: memberships, error: membershipError } = await supabase
      .from('memberships')
      .select('*')
      .eq('club_id', clubData.user?.id)

    if (membershipError) throw membershipError
    console.log('Adhésions du club:', memberships)

    // Déconnexion
    await supabase.auth.signOut()
    console.log('Déconnexion club')

    return true
  } catch (error) {
    console.error('❌ Erreur:', error)
    return false
  }
}

// Exécuter le test
testLogin() 
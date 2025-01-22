import { supabase } from './supabase'

async function createTestData() {
  try {
    // 1. Créer un utilisateur test
    console.log('Création de l\'utilisateur test...')
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email: 'test4@example.com',
      password: 'test123456'
    })

    if (userError) throw userError

    // Créer le profil utilisateur
    const { error: userProfileError } = await supabase
      .from('users')
      .insert({
        id: userData.user?.id,
        email: 'test4@example.com',
        full_name: 'Utilisateur Test 4'
      })

    if (userProfileError) throw userProfileError
    console.log('✅ Utilisateur test créé:', userData.user?.id)

    // 2. Créer un club test
    console.log('Création du club test...')
    const { data: clubAuthData, error: clubAuthError } = await supabase.auth.signUp({
      email: 'club4@example.com',
      password: 'club123456'
    })

    if (clubAuthError) throw clubAuthError

    // Créer le profil utilisateur pour le club
    const { error: clubUserProfileError } = await supabase
      .from('users')
      .insert({
        id: clubAuthData.user?.id,
        email: 'club4@example.com',
        full_name: 'Club Test 4'
      })

    if (clubUserProfileError) throw clubUserProfileError

    // Créer le profil du club
    const { error: clubProfileError } = await supabase
      .from('clubs')
      .insert({
        id: clubAuthData.user?.id,
        name: 'Club Test 4',
        email: 'club4@example.com',
        description: 'Un club de test',
        address: '123 rue de Test',
        phone: '0123456789'
      })

    if (clubProfileError) throw clubProfileError
    console.log('✅ Club test créé:', clubAuthData.user?.id)

    // 3. Créer la relation membre-club (propriétaire)
    console.log('Création de la relation membre-club...')
    const { error: membershipError } = await supabase
      .from('memberships')
      .insert({
        user_id: clubAuthData.user?.id,
        club_id: clubAuthData.user?.id,
        role: 'owner'
      })

    if (membershipError) throw membershipError
    console.log('✅ Relation membre-club créée')

    console.log('\nInformations de connexion :')
    console.log('Utilisateur test:')
    console.log('Email: test4@example.com')
    console.log('Mot de passe: test123456')
    console.log('\nClub test:')
    console.log('Email: club4@example.com')
    console.log('Mot de passe: club123456')

    return {
      userId: userData.user?.id,
      clubId: clubAuthData.user?.id
    }
  } catch (error) {
    console.error('❌ Erreur:', error)
    return null
  }
}

// Exécuter le script
createTestData() 
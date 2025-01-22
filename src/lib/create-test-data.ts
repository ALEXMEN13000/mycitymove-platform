import { supabase } from './supabase'

async function createMoreTestData() {
  try {
    // Créer plusieurs utilisateurs
    const users = [
      { email: 'user1@example.com', password: 'test123456', fullName: 'User One' },
      { email: 'user2@example.com', password: 'test123456', fullName: 'User Two' },
      { email: 'user3@example.com', password: 'test123456', fullName: 'User Three' }
    ]

    const clubs = [
      {
        email: 'club1@example.com',
        password: 'club123456',
        name: 'Club Sport 1',
        description: 'Club de sport et fitness',
        address: '123 rue du Sport',
        phone: '0123456789'
      },
      {
        email: 'club2@example.com',
        password: 'club123456',
        name: 'Club Dance 2',
        description: 'École de danse moderne',
        address: '456 avenue de la Danse',
        phone: '0123456790'
      }
    ]

    console.log('Création des utilisateurs...')
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const { data, error } = await supabase.auth.signUp({
          email: user.email,
          password: user.password
        })
        if (error) throw error

        // Créer le profil utilisateur
        await supabase
          .from('users')
          .insert({
            id: data.user?.id,
            email: user.email,
            full_name: user.fullName
          })

        return data.user
      })
    )
    console.log('✅ Utilisateurs créés')

    console.log('Création des clubs...')
    const createdClubs = await Promise.all(
      clubs.map(async (club) => {
        const { data, error } = await supabase.auth.signUp({
          email: club.email,
          password: club.password
        })
        if (error) throw error

        // Créer le profil utilisateur pour le club
        await supabase
          .from('users')
          .insert({
            id: data.user?.id,
            email: club.email,
            full_name: club.name
          })

        // Créer le profil du club
        await supabase
          .from('clubs')
          .insert({
            id: data.user?.id,
            name: club.name,
            email: club.email,
            description: club.description,
            address: club.address,
            phone: club.phone
          })

        // Créer la relation propriétaire
        await supabase
          .from('memberships')
          .insert({
            user_id: data.user?.id,
            club_id: data.user?.id,
            role: 'owner'
          })

        return data.user
      })
    )
    console.log('✅ Clubs créés')

    // Créer des adhésions aléatoires
    console.log('Création des adhésions...')
    const memberships = []
    for (const user of createdUsers) {
      for (const club of createdClubs) {
        if (Math.random() > 0.5) { // 50% de chance d'être membre
          memberships.push({
            user_id: user?.id,
            club_id: club?.id,
            role: 'member'
          })
        }
      }
    }

    if (memberships.length > 0) {
      await supabase
        .from('memberships')
        .insert(memberships)
    }
    console.log('✅ Adhésions créées')

    console.log('\nInformations de connexion :')
    console.log('Utilisateurs :')
    users.forEach(user => {
      console.log(`Email: ${user.email}, Mot de passe: ${user.password}`)
    })
    console.log('\nClubs :')
    clubs.forEach(club => {
      console.log(`Email: ${club.email}, Mot de passe: ${club.password}`)
    })

    return {
      users: createdUsers,
      clubs: createdClubs
    }
  } catch (error) {
    console.error('❌ Erreur:', error)
    return null
  }
}

// Exécuter le script
createMoreTestData() 
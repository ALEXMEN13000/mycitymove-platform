import { supabase } from '@/lib/supabase'

export const auth = {
  async signUp(email: string, password: string, userType: 'user' | 'club' = 'user', fullName?: string) {
    try {
      console.log('Début inscription:', { email, userType, fullName })
      
      // Vérifier d'abord si l'utilisateur existe dans la base
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single()
      
      if (existingUser) {
        throw new Error('Un compte existe déjà avec cet email. Veuillez vous connecter ou utiliser une autre adresse email.')
      }
      
      // 1. Créer le compte auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
            full_name: fullName
          }
        }
      })

      if (authError) {
        if (authError.message.includes('already registered')) {
          throw new Error('Un compte existe déjà avec cet email. Veuillez vous connecter ou utiliser une autre adresse email.')
        }
        throw authError
      }
      
      console.log('Compte auth créé:', authData)

      if (!authData.user) throw new Error('Aucun utilisateur créé')

      // 2. Créer le profil utilisateur
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          email: authData.user.email,
          full_name: fullName,
          is_club: userType === 'club'
        }])

      if (profileError) {
        console.error('Erreur création profil:', profileError)
        throw profileError
      }
      console.log('Profil utilisateur créé')

      return { data: authData }
    } catch (error) {
      console.error('Erreur signup:', error)
      throw error
    }
  },

  async signUpClub(email: string, password: string, clubData: any) {
    try {
      console.log('Début inscription club:', { email, clubData })
      
      // Vérifier si l'email est déjà utilisé
      const { data: existingUser } = await supabase
        .from('users')
        .select('is_club')
        .eq('email', email)
        .single()

      if (existingUser) {
        if (existingUser.is_club) {
          throw new Error('Un club existe déjà avec cet email')
        } else {
          throw new Error('Un compte membre existe déjà avec cet email. Veuillez utiliser une autre adresse email pour votre club.')
        }
      }
      
      // 1. Créer le compte auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: 'club',
            full_name: clubData.name
          }
        }
      })

      if (authError) throw authError
      console.log('Compte auth créé:', authData)

      if (!authData.user) throw new Error('Aucun utilisateur créé')

      // 2. Créer le profil utilisateur
      const { error: userError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          email: authData.user.email,
          full_name: clubData.name,
          is_club: true
        }])

      if (userError) {
        console.error('Erreur création user:', userError)
        throw userError
      }
      console.log('Profil utilisateur créé')

      // 3. Créer le profil club
      const { error: clubError } = await supabase
        .from('clubs')
        .insert([{
          id: authData.user.id,
          name: clubData.name,
          email: email
        }])

      if (clubError) {
        console.error('Erreur création club:', clubError)
        throw clubError
      }
      console.log('Profil club créé')

      return { data: authData }
    } catch (error) {
      console.error('Erreur signUpClub:', error)
      throw error
    }
  },

  async signIn(email: string, password: string, type: 'user' | 'club' = 'user') {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Vérifier le type d'utilisateur dans la table users
      const { data: user } = await supabase
        .from('users')
        .select('is_club')
        .eq('id', data.user.id)
        .single()

      if (!user) {
        throw new Error('Profil utilisateur non trouvé')
      }

      // Vérifier si le type de connexion correspond au type de compte
      if (type === 'club' && !user.is_club) {
        throw new Error('Ce compte n\'est pas un compte club')
      }

      if (type === 'user' && user.is_club) {
        throw new Error('Ce compte est un compte club, utilisez la connexion club')
      }

      return { user: data.user }
    } catch (error) {
      console.error('Erreur signin:', error)
      throw error
    }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    if (error) throw error
  },

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })
    if (error) throw error
  }
} 
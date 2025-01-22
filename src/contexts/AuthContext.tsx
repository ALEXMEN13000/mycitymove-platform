import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { auth } from '@/services/auth'
import { supabase } from '@/lib/supabase'

type AuthContextType = {
  user: User | null
  userType: 'user' | 'club' | null
  isLoading: boolean
  userProfile: any
  clubProfile: any
  signIn: (email: string, password: string, type?: 'user' | 'club') => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userType, setUserType] = useState<'user' | 'club' | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)
  const [clubProfile, setClubProfile] = useState(null)

  useEffect(() => {
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        checkUser()
      } else {
        setUserType(null)
        setUserProfile(null)
        setClubProfile(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function checkUser() {
    try {
      const session = await auth.getSession()
      const currentUser = session?.user

      if (currentUser) {
        setUser(currentUser)
        
        // Vérifier d'abord dans la table users
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', currentUser.id)
          .single()

        if (userData?.is_club) {
          // Si c'est un club, récupérer les données du club
          const { data: club } = await supabase
            .from('clubs')
            .select('*')
            .eq('id', currentUser.id)
            .single()

          setUserType('club')
          setClubProfile(club)
          setUserProfile(null)
        } else {
          // Si c'est un utilisateur normal
          setUserType('user')
          setUserProfile(userData)
          setClubProfile(null)
        }
      } else {
        setUser(null)
        setUserType(null)
        setUserProfile(null)
        setClubProfile(null)
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', error)
      setUser(null)
      setUserType(null)
      setUserProfile(null)
      setClubProfile(null)
    } finally {
      setIsLoading(false)
    }
  }

  async function signIn(email: string, password: string, type?: 'user' | 'club') {
    const { user: authUser } = await auth.signIn(email, password, type)
    if (authUser) {
      await checkUser()
    }
  }

  async function signOut() {
    await auth.signOut()
    setUser(null)
    setUserType(null)
    setUserProfile(null)
    setClubProfile(null)
  }

  const value = {
    user,
    userType,
    isLoading,
    userProfile,
    clubProfile,
    signIn,
    signOut,
    resetPassword: auth.resetPassword,
    updatePassword: auth.updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider')
  }
  return context
} 
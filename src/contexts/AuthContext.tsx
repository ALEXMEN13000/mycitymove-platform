import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Tentative de connexion avec:', { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Erreur Supabase:', error);
        if (error.message === 'Invalid login credentials') {
          toast.error('Email ou mot de passe incorrect');
        } else {
          toast.error(`Erreur de connexion: ${error.message}`);
        }
        throw error;
      }

      if (data?.user) {
        console.log('Connexion réussie:', data.user);
        setUser(data.user);
        toast.success('Connexion réussie');
      } else {
        console.error('Pas de données utilisateur reçues');
        toast.error('Erreur lors de la connexion');
        throw new Error('No user data received');
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      if (error instanceof Error) {
        toast.error(`Erreur: ${error.message}`);
      } else {
        toast.error('Une erreur inattendue est survenue');
      }
      throw error;
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Déconnexion réussie')
    } catch (error) {
      console.error('Erreur de déconnexion:', error)
      toast.error('Erreur de déconnexion')
      throw error
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      toast.success('Inscription réussie')
    } catch (error) {
      console.error('Erreur d\'inscription:', error)
      toast.error('Erreur d\'inscription')
      throw error
    }
  }

  const value = {
    user,
    isLoading,
    signIn,
    signOut,
    signUp,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
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
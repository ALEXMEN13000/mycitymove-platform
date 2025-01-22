import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface PrivateRouteProps {
  children: React.ReactNode
  userType?: 'user' | 'club'
}

export function PrivateRoute({ children, userType }: PrivateRouteProps) {
  const { user, userType: currentUserType, isLoading } = useAuth()

  // Si l'authentification est en cours, on peut afficher un loader
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion appropriée
  if (!user) {
    return <Navigate to={userType === 'club' ? '/club/login' : '/login'} replace />
  }

  // Si un type d'utilisateur spécifique est requis, vérifier qu'il correspond
  if (userType && userType !== currentUserType) {
    return <Navigate to="/" replace />
  }

  // Si tout est OK, afficher le contenu de la route
  return <>{children}</>
} 
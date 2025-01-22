import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

type LoginFormProps = {
  type?: 'user' | 'club'
  onSuccess?: () => void
  redirectTo?: string
}

export function LoginForm({ type = 'user', onSuccess, redirectTo = type === 'club' ? '/club/dashboard' : '/dashboard' }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const navigate = useNavigate()
  const { signIn, resetPassword } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(email, password, type)
      toast({
        title: 'Connexion réussie',
        description: 'Vous êtes maintenant connecté'
      })
      onSuccess?.()
      navigate(redirectTo)
    } catch (error) {
      toast({
        title: 'Erreur de connexion',
        description: error instanceof Error ? error.message : 'Email ou mot de passe incorrect',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await resetPassword(email)
      toast({
        title: 'Email envoyé',
        description: 'Vérifiez votre boîte mail pour réinitialiser votre mot de passe'
      })
      setShowResetPassword(false)
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer l\'email de réinitialisation',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (showResetPassword) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Réinitialiser le mot de passe</h1>
          <p className="text-sm text-gray-600">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </CardHeader>
        <form onSubmit={handleResetPassword}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                'Envoyer le lien'
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowResetPassword(false)}
            >
              Retour à la connexion
            </Button>
          </CardFooter>
        </form>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold">
          {type === 'club' ? 'Connexion Club' : 'Connexion'}
        </h1>
        <p className="text-sm text-gray-600">
          {type === 'club' 
            ? 'Connectez-vous à votre espace club'
            : 'Connectez-vous à votre compte'
          }
        </p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Mot de passe</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connexion...
              </>
            ) : (
              'Se connecter'
            )}
          </Button>
          <div className="text-center text-sm space-y-2">
            <button
              type="button"
              onClick={() => setShowResetPassword(true)}
              className="text-blue-600 hover:underline"
            >
              Mot de passe oublié ?
            </button>
            <div className="space-x-1">
              <span>Pas encore de compte ?</span>
              <Link
                to={type === 'club' ? '/club/register' : '/register'}
                className="text-blue-600 hover:underline"
              >
                S'inscrire
              </Link>
            </div>
            {type === 'user' && (
              <Link
                to="/club/login"
                className="block text-gray-600 hover:underline"
              >
                Vous êtes un club ? Connexion club
              </Link>
            )}
            {type === 'club' && (
              <Link
                to="/login"
                className="block text-gray-600 hover:underline"
              >
                Vous êtes un utilisateur ? Connexion utilisateur
              </Link>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  )
} 
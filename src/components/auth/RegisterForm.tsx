import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '@/services/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

interface RegisterFormProps {
  type: 'user' | 'club'
}

export function RegisterForm({ type }: RegisterFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (type === 'user') {
        await auth.signUp(email, password, 'user', name)
      } else {
        await auth.signUpClub(email, password, {
          name,
          email,
        })
      }

      toast({
        title: 'Inscription réussie',
        description: type === 'user' 
          ? 'Votre compte a été créé avec succès. Vérifiez votre email pour confirmer votre inscription.'
          : 'Votre club a été créé avec succès. Vérifiez votre email pour confirmer votre inscription.'
      })
      
      navigate(type === 'user' ? '/login' : '/club/login')
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
      toast({
        title: 'Erreur lors de l\'inscription',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold">
          {type === 'user' ? 'Inscription Utilisateur' : 'Inscription Club'}
        </h1>
        <p className="text-sm text-gray-600">
          {type === 'user' 
            ? 'Créez votre compte utilisateur'
            : 'Créez votre compte club'}
        </p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name">
              {type === 'user' ? 'Nom complet' : 'Nom du club'}
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
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
              minLength={6}
              autoComplete="new-password"
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
                Inscription...
              </>
            ) : (
              'S\'inscrire'
            )}
          </Button>
          <div className="text-center text-sm space-y-2">
            <Link 
              to={type === 'user' ? '/login' : '/club/login'} 
              className="text-blue-600 hover:underline block"
            >
              Déjà un compte ? Se connecter
            </Link>
            <Link 
              to={type === 'user' ? '/club/register' : '/register'} 
              className="text-gray-600 hover:underline block"
            >
              {type === 'user' 
                ? 'Vous êtes un club ? Inscription club'
                : 'Vous êtes un utilisateur ? Inscription utilisateur'}
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
} 
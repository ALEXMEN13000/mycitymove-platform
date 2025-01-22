import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function DashboardHeader() {
  const { userProfile, clubProfile, signOut } = useAuth()
  const [notificationCount] = useState(3) // À remplacer par un vrai compteur

  const profile = clubProfile || userProfile
  const initials = profile?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || '?'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Logo */}
        <Link to="/dashboard" className="font-bold text-xl">
          CLUBCENTER
        </Link>

        <div className="ml-auto flex items-center gap-4">
          {/* Bouton Nouvelle Activité */}
          <Button asChild>
            <Link to="/activities/new">
              <Plus className="mr-2 h-4 w-4" />
              Proposer une activité
            </Link>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-4">
                <div className="font-semibold">Notifications</div>
                {notificationCount > 0 && (
                  <Badge variant="secondary">{notificationCount} nouvelles</Badge>
                )}
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-auto">
                {/* Liste des notifications */}
                <div className="p-4 text-sm text-center text-muted-foreground">
                  Pas de nouvelles notifications
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu utilisateur */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{profile?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profile?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600" 
                onSelect={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
} 
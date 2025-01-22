import { useState } from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Search } from 'lucide-react'

// Données de test (à remplacer par des données réelles)
const members = [
  {
    id: 1,
    name: 'Alice Martin',
    email: 'alice@example.com',
    avatar: null,
    joinedDate: '2024-02-15',
    status: 'active',
    activities: ['Yoga Flow', 'Pilates']
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    email: 'thomas@example.com',
    avatar: null,
    joinedDate: '2024-02-14',
    status: 'pending',
    activities: ['CrossFit']
  },
  {
    id: 3,
    name: 'Marie Lambert',
    email: 'marie@example.com',
    avatar: null,
    joinedDate: '2024-02-13',
    status: 'active',
    activities: ['Tennis', 'Natation']
  }
]

export default function ClubMembers() {
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrer les membres
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gestion des membres</h1>
            <p className="text-gray-600">
              {members.length} membres au total
            </p>
          </div>
          <Button>
            Inviter un membre
          </Button>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Rechercher un membre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Liste des membres */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des membres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar || undefined} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                      {member.activities.length} activité(s)
                    </div>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                      {member.status === 'active' ? 'Actif' : 'En attente'}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          Voir le profil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Envoyer un message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Retirer du club
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    Aucun membre ne correspond à votre recherche.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 
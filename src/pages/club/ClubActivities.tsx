import { useState } from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MoreHorizontal, Search, Plus } from 'lucide-react'

// Données de test (à remplacer par des données réelles)
const activities = [
  {
    id: 1,
    name: 'Cours de Tennis',
    category: 'Sport',
    participants: 8,
    maxParticipants: 10,
    nextSession: '2024-02-20T14:00:00',
    price: '25€/séance',
    status: 'active'
  },
  {
    id: 2,
    name: 'Yoga débutant',
    category: 'Yoga',
    participants: 12,
    maxParticipants: 12,
    nextSession: '2024-02-21T10:00:00',
    price: '20€/séance',
    status: 'full'
  },
  {
    id: 3,
    name: 'Natation enfants',
    category: 'Sport',
    participants: 5,
    maxParticipants: 8,
    nextSession: '2024-02-22T16:00:00',
    price: '15€/séance',
    status: 'active'
  }
]

const categories = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'sport', label: 'Sport' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'dance', label: 'Danse' }
]

export default function ClubActivities() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')

  // Filtrer les activités
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'all' || activity.category.toLowerCase() === category
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gestion des activités</h1>
            <p className="text-gray-600">
              {activities.length} activités au total
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Créer une activité
          </Button>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Rechercher une activité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des activités */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des activités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b pb-6 last:border-0 last:pb-0"
                >
                  <div>
                    <h3 className="font-medium">{activity.name}</h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                      <span>{activity.category}</span>
                      <span>•</span>
                      <span>{activity.price}</span>
                      <span>•</span>
                      <span>
                        {activity.participants}/{activity.maxParticipants} participants
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant={activity.status === 'full' ? 'destructive' : 'default'}>
                      {activity.status === 'full' ? 'Complet' : 'Disponible'}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Voir les participants
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Dupliquer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {filteredActivities.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    Aucune activité ne correspond à votre recherche.
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
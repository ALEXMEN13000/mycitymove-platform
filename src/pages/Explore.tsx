import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

// Données de test (à remplacer par des données réelles)
const activities = [
  {
    id: 1,
    name: 'Pilates',
    club: 'Wellness Center',
    location: 'Prado',
    rating: 4.8,
    price: '20€/séance',
    category: 'fitness',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a'
  },
  {
    id: 2,
    name: 'Tennis',
    club: 'Tennis Club Phocéen',
    location: 'Bonneveine',
    rating: 4.9,
    price: '25€/séance',
    category: 'sport',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6'
  },
  {
    id: 3,
    name: 'Natation',
    club: 'Cercle des Nageurs',
    location: 'Vieux Port',
    rating: 4.7,
    price: '15€/séance',
    category: 'sport',
    image: 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50'
  },
  {
    id: 4,
    name: 'Yoga Flow',
    club: 'Studio Zen',
    location: 'Castellane',
    rating: 4.9,
    price: '18€/séance',
    category: 'yoga',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5'
  }
]

const categories = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'sport', label: 'Sport' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'dance', label: 'Danse' }
]

const locations = [
  { value: 'all', label: 'Tous les arrondissements' },
  { value: '13001', label: '1er - Vieux Port' },
  { value: '13006', label: '6ème - Castellane' },
  { value: '13008', label: '8ème - Prado' }
]

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const category = searchParams.get('category') || 'all'
  const location = searchParams.get('location') || 'all'

  // Filtrer les activités
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.club.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'all' || activity.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold">Explorer les activités</h1>
          <p className="text-gray-600">
            Découvrez toutes les activités disponibles
          </p>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Rechercher
                </label>
                <Input
                  placeholder="Rechercher une activité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Catégorie
                </label>
                <Select
                  value={category}
                  onValueChange={(value) => setSearchParams({ category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
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
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Arrondissement
                </label>
                <Select
                  value={location}
                  onValueChange={(value) => setSearchParams({ location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un arrondissement" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.value} value={loc.value}>
                        {loc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Résultats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredActivities.map((activity) => (
            <Link
              key={activity.id}
              to={`/activity/${activity.id}`}
              className="group block"
            >
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{activity.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{activity.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{activity.club}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {activity.location}
                    </div>
                    <span className="font-medium">{activity.price}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Aucune activité ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
} 
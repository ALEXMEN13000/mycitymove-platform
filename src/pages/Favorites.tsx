import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

// Données de test (à remplacer par des données réelles)
const favoriteActivities = [
  {
    id: 1,
    name: 'Yoga Flow',
    club: 'Studio Zen',
    location: 'Castellane',
    nextSession: '2024-02-20T10:00:00',
    status: 'confirmed',
    price: '20€/séance',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5'
  },
  {
    id: 2,
    name: 'CrossFit',
    club: 'FitBox',
    location: 'Vieux Port',
    nextSession: '2024-02-21T18:00:00',
    status: 'pending',
    price: '25€/séance',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed'
  },
  {
    id: 3,
    name: 'Tennis',
    club: 'Tennis Club Phocéen',
    location: 'Bonneveine',
    nextSession: '2024-02-22T14:00:00',
    status: 'confirmed',
    price: '30€/séance',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6'
  }
]

export default function Favorites() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold">Activités favorites</h1>
          <p className="text-gray-600">
            Retrouvez toutes vos activités préférées
          </p>
        </div>

        {/* Liste des favoris */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favoriteActivities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="h-full w-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </Button>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{activity.name}</CardTitle>
                  <Badge variant={activity.status === 'confirmed' ? 'default' : 'secondary'}>
                    {activity.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{activity.club}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {activity.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {new Date(activity.nextSession).toLocaleString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="font-medium">{activity.price}</span>
                    <Button asChild>
                      <Link to={`/activity/${activity.id}`}>
                        Voir les détails
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
} 
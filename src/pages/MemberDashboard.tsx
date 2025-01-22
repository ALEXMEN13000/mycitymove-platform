import { useAuth } from '@/contexts/AuthContext'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calendar as CalendarIcon,
  Heart,
  Search,
  MapPin,
  Clock,
  ChevronRight,
  Star
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Données de test (à remplacer par des données réelles)
const favoriteActivities = [
  {
    id: 1,
    name: 'Yoga Flow',
    club: 'Studio Zen',
    location: 'Castellane',
    nextSession: '2024-02-20T10:00:00',
    status: 'confirmed'
  },
  {
    id: 2,
    name: 'CrossFit',
    club: 'FitBox',
    location: 'Vieux Port',
    nextSession: '2024-02-21T18:00:00',
    status: 'pending'
  }
]

const recommendedActivities = [
  {
    id: 1,
    name: 'Pilates',
    club: 'Wellness Center',
    location: 'Prado',
    rating: 4.8,
    price: '20€/séance',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a'
  },
  {
    id: 2,
    name: 'Tennis',
    club: 'Tennis Club Phocéen',
    location: 'Bonneveine',
    rating: 4.9,
    price: '25€/séance',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6'
  },
  {
    id: 3,
    name: 'Natation',
    club: 'Cercle des Nageurs',
    location: 'Vieux Port',
    rating: 4.7,
    price: '15€/séance',
    image: 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50'
  }
]

const upcomingEvents = [
  {
    id: 1,
    name: 'Cours de Yoga',
    date: '2024-02-20T10:00:00',
    club: 'Studio Zen',
    location: 'Castellane'
  },
  {
    id: 2,
    name: 'CrossFit',
    date: '2024-02-21T18:00:00',
    club: 'FitBox',
    location: 'Vieux Port'
  },
  {
    id: 3,
    name: 'Natation',
    date: '2024-02-22T14:00:00',
    club: 'Cercle des Nageurs',
    location: 'Vieux Port'
  }
]

export default function MemberDashboard() {
  const { userProfile } = useAuth()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold">
            Bonjour, {userProfile?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-600">
            Prêt pour votre prochaine activité ?
          </p>
        </div>

        {/* Recherche rapide */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold">
                Que souhaitez-vous faire aujourd'hui ?
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button asChild variant="outline">
                  <Link to="/explore?category=sport">
                    🏃‍♂️ Sport
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/explore?category=fitness">
                    💪 Fitness
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/explore?category=yoga">
                    🧘‍♀️ Yoga
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/explore?category=dance">
                    💃 Danse
                  </Link>
                </Button>
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link to="/explore">
                  <Search className="mr-2 h-4 w-4" />
                  Explorer toutes les activités
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activités favorites et Calendrier */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Activités favorites */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Activités favorites</CardTitle>
                <p className="text-sm text-gray-600">
                  Vos activités préférées
                </p>
              </div>
              <Button asChild variant="ghost" size="icon">
                <Link to="/favorites">
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favoriteActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{activity.name}</h3>
                      <p className="text-sm text-gray-600">{activity.club}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {activity.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={activity.status === 'confirmed' ? 'default' : 'secondary'}>
                        {activity.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {new Date(activity.nextSession).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendrier */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Calendrier</CardTitle>
                <p className="text-sm text-gray-600">
                  Vos prochaines activités
                </p>
              </div>
              <Button asChild variant="ghost" size="icon">
                <Link to="/calendar">
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        <CalendarIcon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{event.name}</h3>
                        <p className="text-sm text-gray-600">{event.club}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {new Date(event.date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activités recommandées */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recommandations pour vous</CardTitle>
                <p className="text-sm text-gray-600">
                  Basées sur vos intérêts
                </p>
              </div>
              <Button asChild variant="ghost" size="icon">
                <Link to="/explore">
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recommendedActivities.map((activity) => (
                <Link
                  key={activity.id}
                  to={`/activity/${activity.id}`}
                  className="group relative overflow-hidden rounded-lg border transition-all hover:shadow-md"
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{activity.name}</h3>
                    <p className="text-sm text-gray-600">{activity.club}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{activity.rating}</span>
                      </div>
                      <span className="text-sm font-medium">{activity.price}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {activity.location}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 
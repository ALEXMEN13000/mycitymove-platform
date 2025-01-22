import { useAuth } from '@/contexts/AuthContext'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import {
  Users,
  Calendar,
  TrendingUp,
  Star,
  ChevronRight,
  Plus,
  BarChart2,
  Bell,
  MessageSquare,
  Settings,
  Crown
} from 'lucide-react'

// Données de test (à remplacer par des données réelles)
const activities = [
  {
    id: 1,
    name: 'Cours de Tennis',
    participants: 8,
    maxParticipants: 10,
    nextSession: '2024-02-20T14:00:00',
    status: 'active'
  },
  {
    id: 2,
    name: 'Yoga débutant',
    participants: 12,
    maxParticipants: 12,
    nextSession: '2024-02-21T10:00:00',
    status: 'full'
  },
  {
    id: 3,
    name: 'Natation enfants',
    participants: 5,
    maxParticipants: 8,
    nextSession: '2024-02-22T16:00:00',
    status: 'active'
  }
]

const stats = [
  {
    title: 'Total participants',
    value: '156',
    change: '+12%',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Activités actives',
    value: '8',
    change: '+2',
    icon: Calendar,
    color: 'text-green-600'
  },
  {
    title: 'Taux de participation',
    value: '92%',
    change: '+5%',
    icon: TrendingUp,
    color: 'text-yellow-600'
  },
  {
    title: 'Note moyenne',
    value: '4.8',
    change: '+0.2',
    icon: Star,
    color: 'text-purple-600'
  }
]

const recentMembers = [
  {
    id: 1,
    name: 'Alice Martin',
    email: 'alice@example.com',
    avatar: null,
    joinedDate: '2024-02-15'
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    email: 'thomas@example.com',
    avatar: null,
    joinedDate: '2024-02-14'
  },
  {
    id: 3,
    name: 'Marie Lambert',
    email: 'marie@example.com',
    avatar: null,
    joinedDate: '2024-02-13'
  }
]

// Nouvelles données de test
const notifications = [
  {
    id: 1,
    type: 'review',
    content: 'Nouveau avis 5 étoiles pour "Cours de Tennis"',
    time: '2024-02-20T10:30:00'
  },
  {
    id: 2,
    type: 'registration',
    content: 'Nouvelle inscription à "Yoga débutant"',
    time: '2024-02-20T09:15:00'
  },
  {
    id: 3,
    type: 'message',
    content: 'Message de Marie Lambert concernant "Natation enfants"',
    time: '2024-02-20T08:45:00'
  }
]

const recentReviews = [
  {
    id: 1,
    author: 'Sophie Martin',
    activity: 'Cours de Tennis',
    rating: 5,
    comment: 'Excellent cours, professeur très pédagogue !',
    date: '2024-02-19'
  },
  {
    id: 2,
    author: 'Lucas Dubois',
    activity: 'Yoga débutant',
    rating: 4,
    comment: 'Très bonne ambiance, je recommande.',
    date: '2024-02-18'
  }
]

export default function ClubDashboard() {
  const { clubProfile } = useAuth()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête avec statut d'abonnement */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">
              Bonjour, {clubProfile?.name}
            </h1>
            <p className="text-gray-600">
              Voici un aperçu de vos activités et statistiques
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              Abonnement Premium
            </Badge>
            <Button variant="outline" asChild>
              <Link to="/club/profile">
                <Settings className="mr-2 h-4 w-4" />
                Gérer le profil
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} depuis le mois dernier
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Notifications et avis récents */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Notifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications récentes
                </CardTitle>
              </div>
              <Button variant="ghost" size="sm">
                Tout marquer comme lu
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-4 p-3 rounded-lg border"
                  >
                    <div className="flex-1">
                      <p className="text-sm">{notification.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Avis récents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Avis récents
                </CardTitle>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/club/reviews">
                  Voir tous les avis
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-3 rounded-lg border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.author}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{review.activity}</span>
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activités en cours et nouveaux membres */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Activités en cours */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Activités en cours</CardTitle>
                <p className="text-sm text-gray-600">
                  Gérez vos activités actuelles
                </p>
              </div>
              <Button asChild variant="ghost" size="icon">
                <Link to="/activities">
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <h3 className="font-medium">{activity.name}</h3>
                      <p className="text-sm text-gray-600">
                        {activity.participants}/{activity.maxParticipants} participants
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={activity.status === 'full' ? 'destructive' : 'default'}>
                        {activity.status === 'full' ? 'Complet' : 'Disponible'}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Gérer
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full" asChild>
                  <Link to="/activities/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer une activité
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Nouveaux membres */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Nouveaux membres</CardTitle>
                <p className="text-sm text-gray-600">
                  Derniers inscrits à vos activités
                </p>
              </div>
              <Button asChild variant="ghost" size="icon">
                <Link to="/members">
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
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
                    <p className="text-sm text-gray-600">
                      Inscrit le {new Date(member.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/members">
                    Voir tous les membres
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques statistiques */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Statistiques détaillées</CardTitle>
                <p className="text-sm text-gray-600">
                  Analyse de vos performances
                </p>
              </div>
              <Button variant="outline" size="sm">
                <BarChart2 className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-lg">
              <p className="text-gray-500">Graphiques à implémenter</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 
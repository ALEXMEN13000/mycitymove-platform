import { useAuth } from '@/contexts/AuthContext'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Calendar, Star, Trophy } from 'lucide-react'

export default function Dashboard() {
  const { userProfile } = useAuth()

  const stats = [
    {
      title: 'Clubs suivis',
      value: '12',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Événements à venir',
      value: '3',
      icon: Calendar,
      color: 'text-green-600',
    },
    {
      title: 'Sports favoris',
      value: '4',
      icon: Star,
      color: 'text-yellow-600',
    },
    {
      title: 'Points fidélité',
      value: '250',
      icon: Trophy,
      color: 'text-purple-600',
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold">
            Bonjour, {userProfile?.name}
          </h1>
          <p className="text-gray-600">
            Voici un aperçu de votre activité sportive
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Clubs recommandés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Découvrez des clubs qui correspondent à vos intérêts
              </p>
              <Button>
                Explorer les clubs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Événements à venir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Participez aux prochains événements sportifs
              </p>
              <Button>
                Voir les événements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Calendar 
} from 'lucide-react'

// Données de test (à remplacer par des données réelles)
const stats = {
  totalMembers: 45,
  activeActivities: 8,
  monthlyParticipants: 156,
  upcomingSessions: 12
}

const recentActivity = [
  {
    id: 1,
    type: 'new_member',
    description: 'Nouveau membre inscrit',
    date: '2024-02-20T10:00:00'
  },
  {
    id: 2,
    type: 'session_full',
    description: 'Cours de Yoga complet',
    date: '2024-02-19T15:30:00'
  },
  {
    id: 3,
    type: 'new_activity',
    description: 'Nouvelle activité créée : Tennis',
    date: '2024-02-18T09:00:00'
  }
]

function ClubStats() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold">Statistiques</h1>
          <p className="text-gray-600">
            Aperçu des performances de votre club
          </p>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Membres totaux
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMembers}</div>
              <p className="text-xs text-muted-foreground">
                membres actifs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Activités actives
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeActivities}</div>
              <p className="text-xs text-muted-foreground">
                activités en cours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Participants mensuels
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyParticipants}</div>
              <p className="text-xs text-muted-foreground">
                ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sessions à venir
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingSessions}</div>
              <p className="text-xs text-muted-foreground">
                prochains jours
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activité récente */}
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(activity.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default ClubStats; 
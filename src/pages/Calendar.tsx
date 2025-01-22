import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock } from 'lucide-react'

// Données de test (à remplacer par des données réelles)
const events = [
  {
    id: 1,
    name: 'Cours de Yoga',
    club: 'Studio Zen',
    location: 'Castellane',
    date: '2024-02-20T10:00:00',
    duration: 60,
    status: 'upcoming'
  },
  {
    id: 2,
    name: 'CrossFit',
    club: 'FitBox',
    location: 'Vieux Port',
    date: '2024-02-21T18:00:00',
    duration: 45,
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'Natation',
    club: 'Cercle des Nageurs',
    location: 'Vieux Port',
    date: '2024-02-22T14:00:00',
    duration: 90,
    status: 'upcoming'
  }
]

// Grouper les événements par date
const groupedEvents = events.reduce((groups, event) => {
  const date = new Date(event.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })
  if (!groups[date]) {
    groups[date] = []
  }
  groups[date].push(event)
  return groups
}, {})

export default function Calendar() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold">Calendrier</h1>
          <p className="text-gray-600">
            Vos prochaines activités
          </p>
        </div>

        {/* Liste des événements */}
        <div className="space-y-6">
          {Object.entries(groupedEvents).map(([date, dayEvents]) => (
            <div key={date} className="space-y-4">
              <h2 className="text-lg font-semibold capitalize">{date}</h2>
              <div className="grid gap-4">
                {dayEvents.map((event: any) => (
                  <Card key={event.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        {/* Heure */}
                        <div className="flex-shrink-0 w-24 text-center">
                          <div className="text-2xl font-bold">
                            {new Date(event.date).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          <div className="text-sm text-gray-600">
                            {event.duration} min
                          </div>
                        </div>

                        {/* Détails */}
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{event.name}</h3>
                            <Badge variant="outline">
                              {event.status === 'upcoming' ? 'À venir' : 'Terminé'}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{event.club}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {event.duration} minutes
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
} 
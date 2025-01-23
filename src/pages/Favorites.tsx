import React from 'react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// Données de test pour les activités favorites
const favoriteActivities = [
  {
    id: 1,
    name: 'Yoga Flow',
    club: 'Studio Zen',
    location: 'Castellane',
    nextSession: '2024-02-20T10:00:00',
    status: 'confirmed',
    rating: 4.8,
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
    rating: 4.9,
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
    rating: 4.7,
    price: '30€/séance',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6'
  }
];

export default function Favorites() {
  return (
    <UserLayout>
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Activités Préférées</h1>
      </div>

      {/* Liste des activités favorites */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favoriteActivities.map((activity) => (
          <Card key={activity.id} className="overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img
                src={activity.image}
                alt={activity.name}
                className="h-full w-full object-cover"
              />
              <Badge 
                className={`absolute top-2 right-2 ${
                  activity.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {activity.status === 'confirmed' ? 'Confirmé' : 'En attente'}
              </Badge>
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
    </UserLayout>
  );
} 
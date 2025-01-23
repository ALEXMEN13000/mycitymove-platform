import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Star, 
  MessageSquare,
  Settings,
  Building2,
  Shield,
  Plus,
  Search,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Données de test
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
    category: 'Bien-être',
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
];

const ClubActivities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const sidebarItems = [
    { label: 'Tableau de bord', icon: BarChart3, link: '/club/dashboard' },
    { label: 'Activités', icon: Calendar, active: true, link: '/club/activities' },
    { label: 'Avis', icon: MessageSquare, link: '/club/reviews' },
    { label: 'Statistiques', icon: BarChart3, link: '/club/statistics' },
    { label: 'Profil Club', icon: Building2, link: '/club/profile' },
    { label: 'Documents légaux', icon: Shield, link: '/club/legal' },
    { label: 'Paramètres', icon: Settings, link: '/club/settings' },
  ];

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        {/* Logo et titre */}
        <div className="flex items-center p-4 border-b">
          <img 
            src="https://via.placeholder.com/40"
            alt="Club Logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="ml-3 text-xl font-semibold">Club Dashboard</h1>
        </div>

        {/* Menu items */}
        <nav className="p-4">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header with title and button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Gestion des Activités</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Ajouter une activité
            </Button>
          </div>

          {/* Activities section */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6">Mes Activités</h3>
            
            {/* Search bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Rechercher une activité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Activities list */}
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <h4 className="font-medium">{activity.name}</h4>
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
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Voir les participants</DropdownMenuItem>
                        <DropdownMenuItem>Dupliquer</DropdownMenuItem>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubActivities; 
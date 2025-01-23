import React from 'react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Données de test pour les notifications
const notifications = [
  {
    id: 1,
    type: 'schedule',
    title: 'Schedule changed for Advanced Yoga on Mondays',
    details: 'now starting at 9:30 AM',
    date: '14/03/2024',
    isUnread: true
  },
  // Ajoutez plus de notifications si nécessaire
];

export default function Notifications() {
  return (
    <UserLayout>
      {/* En-tête */}
      <h1 className="text-2xl font-bold mb-8">Notifications</h1>

      {/* Liste des notifications */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <div className="space-y-0.5">
                    <h2 className="text-lg font-semibold">
                      {notification.title}
                    </h2>
                    <p className="text-gray-600">
                      {notification.details}
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {notification.date}
                  </p>
                </div>
              </div>
              <Button 
                variant="link" 
                className="text-blue-600 hover:text-blue-800"
              >
                Mark as read
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </UserLayout>
  );
} 
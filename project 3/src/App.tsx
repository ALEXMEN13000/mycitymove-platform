import React, { useState } from 'react';
import { ReviewList } from './components/ReviewList';
import { FavoriteActivities } from './components/FavoriteActivities';
import { NotificationList } from './components/NotificationList';
import { Activity, Review, Notification } from './types';
import { ClipboardList, Heart, Bell, Settings } from 'lucide-react';

// Mock data for demonstration
const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    activityId: 'activity1',
    clubId: 'club1',
    rating: 4.5,
    comment: 'Great experience! The instructor was very knowledgeable and patient. The facilities were clean and well-maintained. I would definitely recommend this class to anyone interested in learning more about this activity.',
    createdAt: '2024-03-15T10:00:00Z',
  },
  // Add more mock reviews...
];

const mockActivities: Activity[] = [
  {
    id: 'activity1',
    name: 'Advanced Yoga',
    clubId: 'club1',
    clubName: 'Wellness Center',
    schedule: [
      { id: 's1', dayOfWeek: 'Monday', startTime: '09:00', endTime: '10:30' },
      { id: 's2', dayOfWeek: 'Wednesday', startTime: '18:00', endTime: '19:30' },
      { id: 's3', dayOfWeek: 'Friday', startTime: '07:30', endTime: '09:00' },
    ],
    averageRating: 4.5,
    totalReviews: 128,
  },
  // Add more mock activities...
];

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    activityId: 'activity1',
    type: 'schedule_change',
    message: 'Schedule changed for Advanced Yoga on Mondays - now starting at 9:30 AM',
    createdAt: '2024-03-14T15:00:00Z',
    read: false,
  },
  // Add more mock notifications...
];

function App() {
  const [activeSection, setActiveSection] = useState<'reviews' | 'favorites' | 'notifications' | 'settings'>('reviews');
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const handleEditReview = (reviewId: string) => {
    // Implement edit functionality
    console.log('Edit review:', reviewId);
  };

  const handleDeleteReview = (reviewId: string) => {
    // Implement delete functionality
    console.log('Delete review:', reviewId);
  };

  const handleRemoveFavorite = (activityId: string) => {
    // Implement remove from favorites functionality
    console.log('Remove from favorites:', activityId);
  };

  const handleMarkNotificationAsRead = (notificationId: string) => {
    // Implement mark as read functionality
    console.log('Mark notification as read:', notificationId);
  };

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Mon Profil</h1>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('reviews')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'reviews'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ClipboardList size={20} />
              <span className="font-medium">Mes Avis</span>
            </button>
            <button
              onClick={() => setActiveSection('favorites')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'favorites'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Heart size={20} />
              <span className="font-medium">Activités Préférées</span>
            </button>
            <button
              onClick={() => setActiveSection('notifications')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'notifications'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </div>
              <span className="font-medium">Notifications</span>
            </button>
          </nav>
        </div>
        
        {/* Settings Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="relative">
            <button
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                showSettingsDropdown
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings size={20} />
              <span className="font-medium">Paramètres</span>
            </button>
            
            {showSettingsDropdown && (
              <div className="absolute bottom-full left-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 mb-2 overflow-hidden">
                <button
                  onClick={() => {
                    setActiveSection('settings');
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                >
                  Modifier mot de passe
                </button>
                <button
                  onClick={() => {
                    setActiveSection('settings');
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                >
                  Données personnelles
                </button>
                <button
                  onClick={() => {
                    setActiveSection('settings');
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Supprimer le compte
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {activeSection === 'reviews' && 'Mes Avis'}
              {activeSection === 'favorites' && 'Activités Préférées'}
              {activeSection === 'notifications' && 'Notifications'}
              {activeSection === 'settings' && 'Paramètres du Compte'}
            </h2>
            
            {activeSection === 'reviews' && (
              <ReviewList
                reviews={mockReviews}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview}
              />
            )}
            {activeSection === 'favorites' && (
              <FavoriteActivities
                activities={mockActivities}
                onRemoveFavorite={handleRemoveFavorite}
              />
            )}
            {activeSection === 'notifications' && (
              <NotificationList
                notifications={mockNotifications}
                onMarkAsRead={handleMarkNotificationAsRead}
              />
            )}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                <p className="text-gray-600">
                  Cette section vous permet de gérer vos paramètres de compte, y compris la modification de votre mot de passe, 
                  la gestion de vos données personnelles et les options de suppression de compte.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
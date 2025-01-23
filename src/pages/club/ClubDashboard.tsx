import React from 'react';
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
} from 'lucide-react';

const ClubDashboard = () => {
  const stats = [
    { label: 'Visites du profil', value: '1,234', icon: Users },
    { label: 'Note moyenne', value: '4.8', icon: Star },
    { label: 'Activités', value: '12', icon: Calendar },
    { label: 'Avis reçus', value: '48', icon: MessageSquare },
  ];

  const sidebarItems = [
    { label: 'Profil Club', icon: Building2, link: '/club/profile' },
    { label: 'Tableau de bord', icon: BarChart3, active: true, link: '/club/dashboard' },
    { label: 'Activités', icon: Calendar, link: '/club/activities' },
    { label: 'Avis', icon: MessageSquare, link: '/club/reviews' },
    { label: 'Documents légaux', icon: Shield, link: '/club/legal' },
    { label: 'Paramètres', icon: Settings, link: '/club/settings' },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] mt-16">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        {/* Logo et titre */}
        <div className="flex items-center p-4 border-b">
          <Link to="/club/profile" className="flex items-center">
            <img 
              src="https://via.placeholder.com/40"
              alt="Club Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="ml-3 text-xl font-semibold">Club Dashboard</h1>
          </Link>
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
          <h2 className="text-2xl font-bold mb-6">Vue d'ensemble</h2>
          
          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-500 text-sm">{stat.label}</h3>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard; 
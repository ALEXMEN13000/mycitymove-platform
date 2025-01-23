import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Calendar, 
  MessageSquare,
  Settings,
  Building2,
  Shield,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Activities = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const sidebarItems = [
    { label: 'Profil Club', icon: Building2, link: '/club/profile' },
    { label: 'Tableau de bord', icon: BarChart3, link: '/club/dashboard' },
    { label: 'Activités', icon: Calendar, active: true, link: '/club/activities' },
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
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {/* Header with title and button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Gestion des Activités</h2>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => navigate('/club/activities/new')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter une activité
            </Button>
          </div>

          {/* Activities section */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-bold">Mes Activités</h3>
            {/* La liste des activités sera ajoutée ici */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities; 
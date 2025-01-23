import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  Heart, 
  Bell, 
  Settings, 
  Lock, 
  User, 
  Trash2,
  ChevronDown,
  ChevronUp,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface UserLayoutProps {
  children: React.ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50 mt-16">
      {/* Barre latérale */}
      <div className="w-64 bg-white border-r min-h-[calc(100vh-64px)] fixed">
        <div className="p-6 flex flex-col h-full">
          <h1 className="text-2xl font-bold mb-8">Mon espace personnel</h1>
          
          {/* Navigation principale */}
          <div className="space-y-2">
            <Link 
              to="/reviews" 
              className={`flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === '/reviews'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ClipboardList className="w-5 h-5 mr-3" />
              <span>Mes Avis</span>
            </Link>

            <Link 
              to="/favorites" 
              className={`flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === '/favorites'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="w-5 h-5 mr-3" />
              <span>Activités Préférées</span>
            </Link>

            <Link 
              to="/notifications" 
              className={`flex items-center p-3 rounded-lg transition-colors relative ${
                location.pathname === '/notifications'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bell className="w-5 h-5 mr-3" />
              <span>Notifications</span>
              <span className="absolute top-2 left-6 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                1
              </span>
            </Link>
          </div>

          {/* Paramètres avec menu déroulant */}
          <div className="mt-8 pt-8 border-t">
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="flex items-center justify-between w-full p-3 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center">
                <Settings className="w-5 h-5 mr-3" />
                <span>Paramètres</span>
              </div>
              {isSettingsOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Menu déroulant des paramètres */}
            {isSettingsOpen && (
              <div className="ml-3 mt-2 pl-3 border-l border-gray-200">
                <Link 
                  to="/change-password" 
                  className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Lock className="w-5 h-5 mr-3" />
                  <span>Modifier mot de passe</span>
                </Link>

                <Link 
                  to="/personal-data" 
                  className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="w-5 h-5 mr-3" />
                  <span>Données personnelles</span>
                </Link>

                <button 
                  className="flex items-center w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5 mr-3" />
                  <span>Supprimer le compte</span>
                </button>
              </div>
            )}
          </div>

          {/* Bouton de déconnexion */}
          <button 
            onClick={handleSignOut}
            className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors mt-auto"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 
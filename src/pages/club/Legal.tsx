import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Calendar, 
  MessageSquare,
  Settings,
  Building2,
  Shield,
  FileText,
  Upload,
  Lock,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Legal = () => {
  const sidebarItems = [
    { label: 'Profil Club', icon: Building2, link: '/club/profile' },
    { label: 'Tableau de bord', icon: BarChart3, link: '/club/dashboard' },
    { label: 'Activités', icon: Calendar, link: '/club/activities' },
    { label: 'Avis', icon: MessageSquare, link: '/club/reviews' },
    { label: 'Documents légaux', icon: Shield, active: true, link: '/club/legal' },
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
          <h2 className="text-2xl font-bold mb-8">Documents légaux</h2>

          {/* Conditions d'utilisation */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Conditions d'utilisation</h3>
                  <p className="text-gray-600 mb-4">
                    Document détaillant les conditions d'utilisation de la plateforme
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Dernière mise à jour : 15/02/2024</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Mettre à jour
              </Button>
            </div>
          </div>

          {/* Politique de confidentialité */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Politique de confidentialité</h3>
                  <p className="text-gray-600 mb-4">
                    Document détaillant notre politique de protection des données
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Dernière mise à jour : 15/02/2024</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Mettre à jour
              </Button>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Certifications</h3>
                  <p className="text-gray-600 mb-4">
                    Vos certifications et accréditations professionnelles
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Certification sportive</p>
                        <p className="text-sm text-gray-500">Valide jusqu'au 31/12/2024</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                    </div>
                    <Button className="w-full">
                      Ajouter une certification
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal; 
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  BarChart3, 
  Calendar, 
  MessageSquare,
  Settings,
  Building2,
  Shield,
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const sidebarItems = [
    { label: 'Profil Club', icon: Building2, active: true, link: '/club/profile' },
    { label: 'Tableau de bord', icon: BarChart3, link: '/club/dashboard' },
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
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Gestion du Profil Club</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Sauvegarder les modifications
            </Button>
          </div>

          {/* Informations générales */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-xl font-semibold mb-6">Informations générales</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo du club
                  </label>
                  <div className="flex items-start space-x-4">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Logo preview"
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    <div className="space-y-2">
                      <Button variant="outline">
                        Choisir un fichier
                      </Button>
                      <p className="text-sm text-gray-500">PNG, JPG jusqu'à 5MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du club
                  </label>
                  <Input placeholder="Nom du club" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea 
                  placeholder="Décrivez votre club..."
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-xl font-semibold mb-6">Coordonnées</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline-block mr-2" />
                    Email
                  </label>
                  <Input type="email" placeholder="email@club.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline-block mr-2" />
                    Téléphone
                  </label>
                  <Input type="tel" placeholder="+33 1 23 45 67 89" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline-block mr-2" />
                  Adresse
                </label>
                <Input placeholder="Adresse complète" />
              </div>
            </div>
          </div>

          {/* Liens externes */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Liens externes</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline-block mr-2" />
                  Site web
                </label>
                <Input type="url" placeholder="https://www.votreclub.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Instagram className="w-4 h-4 inline-block mr-2" />
                  Instagram
                </label>
                <Input type="url" placeholder="https://instagram.com/votreclub" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Facebook className="w-4 h-4 inline-block mr-2" />
                  Facebook
                </label>
                <Input type="url" placeholder="https://facebook.com/votreclub" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Twitter className="w-4 h-4 inline-block mr-2" />
                  Twitter
                </label>
                <Input type="url" placeholder="https://twitter.com/votreclub" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
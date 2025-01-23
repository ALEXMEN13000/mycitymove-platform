import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  BarChart3, 
  Calendar, 
  MessageSquare,
  Settings as SettingsIcon,
  Building2,
  Shield,
  Languages,
  Volume2,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const sidebarItems = [
    { label: 'Profil Club', icon: Building2, link: '/club/profile' },
    { label: 'Tableau de bord', icon: BarChart3, link: '/club/dashboard' },
    { label: 'Activités', icon: Calendar, link: '/club/activities' },
    { label: 'Avis', icon: MessageSquare, link: '/club/reviews' },
    { label: 'Documents légaux', icon: Shield, link: '/club/legal' },
    { label: 'Paramètres', icon: SettingsIcon, active: true, link: '/club/settings' },
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
            <h2 className="text-2xl font-bold">Paramètres du Compte</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Sauvegarder les modifications
            </Button>
          </div>

          {/* Configuration générale */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-xl font-semibold mb-6">Configuration générale</h3>
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Languages className="w-4 h-4 mr-2" />
                  Langue
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Français" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Volume des sons
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="75"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Préférences de notification */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-xl font-semibold mb-6">Préférences de notification</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <span className="font-medium">Notifications par email</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Recevoir des notifications par email</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <span className="font-medium">Notifications push</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Recevoir des notifications sur le navigateur</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <span className="font-medium">Notifications d'activités</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Notifications sur les nouvelles activités</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Modification du mot de passe */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-xl font-semibold mb-6">Modification du mot de passe</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe actuel
                </label>
                <Input type="password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <Input type="password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <Input type="password" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Mettre à jour le mot de passe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 
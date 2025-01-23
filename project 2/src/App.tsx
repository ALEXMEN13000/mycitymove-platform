import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Star, 
  PlusCircle,
  Settings,
  FileText,
  MessageSquare,
  Building2,
  Shield,
  Clock,
  Euro,
  Image,
  Link,
  User,
  Info,
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Bell,
  Eye,
  Lock,
  Moon,
  Sun,
  Languages,
  Volume2
} from 'lucide-react';

type Tab = 'dashboard' | 'activities' | 'reviews' | 'analytics' | 'profile' | 'legal' | 'settings';
type Theme = 'light' | 'dark' | 'system';
type Language = 'fr' | 'en';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showNewActivity, setShowNewActivity] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('fr');

  const stats = [
    { label: 'Visites du profil', value: '1,234', icon: Users },
    { label: 'Note moyenne', value: '4.8', icon: Star },
    { label: 'Activités', value: '12', icon: Calendar },
    { label: 'Avis reçus', value: '48', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-white border-r border-gray-200">
        <div className="flex items-center p-6 border-b">
          <img 
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <h1 className="ml-3 text-xl font-bold">Club Dashboard</h1>
        </div>
        <nav className="p-4">
          {[
            { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
            { id: 'activities', label: 'Activités', icon: Calendar },
            { id: 'reviews', label: 'Avis', icon: MessageSquare },
            { id: 'analytics', label: 'Statistiques', icon: BarChart3 },
            { id: 'profile', label: 'Profil Club', icon: Building2 },
            { id: 'legal', label: 'Documents légaux', icon: Shield },
            { id: 'settings', label: 'Paramètres', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center p-3 rounded-lg mb-1 ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Vue d'ensemble</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-8 h-8 text-blue-500" />
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <h3 className="text-gray-600">{stat.label}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestion du Profil Club</h2>
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sauvegarder les modifications
              </button>
            </div>

            <div className="space-y-6">
              {/* Informations générales */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Informations générales</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Logo et nom du club */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Logo du club
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center">
                          <img
                            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60"
                            alt="Logo du club"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            PNG, JPG jusqu'à 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du club
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Nom du club"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-lg"
                      rows={4}
                      placeholder="Décrivez votre club..."
                    />
                  </div>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Coordonnées</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline-block mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-lg"
                      placeholder="email@club.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline-block mr-2" />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 border rounded-lg"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline-block mr-2" />
                      Adresse
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Adresse complète"
                    />
                  </div>
                </div>
              </div>

              {/* Liens externes */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Liens externes</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Globe className="w-4 h-4 inline-block mr-2" />
                      Site web
                    </label>
                    <input
                      type="url"
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://www.votreclub.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Instagram className="w-4 h-4 inline-block mr-2" />
                      Instagram
                    </label>
                    <input
                      type="url"
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://instagram.com/votreclub"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Facebook className="w-4 h-4 inline-block mr-2" />
                      Facebook
                    </label>
                    <input
                      type="url"
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://facebook.com/votreclub"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Twitter className="w-4 h-4 inline-block mr-2" />
                      Twitter
                    </label>
                    <input
                      type="url"
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://twitter.com/votreclub"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestion des Activités</h2>
              <button
                onClick={() => setShowNewActivity(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Ajouter une activité
              </button>
            </div>

            {showNewActivity && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <h3 className="text-xl font-bold mb-4">Nouvelle Activité</h3>
                <form className="space-y-6">
                  {/* Informations de base */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Informations de base</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom de l'activité *
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Catégorie *
                        </label>
                        <select className="w-full p-2 border rounded-lg" required>
                          <option>Sport collectif</option>
                          <option>Sport individuel</option>
                          <option>Fitness</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description détaillée
                        </label>
                        <textarea
                          className="w-full p-2 border rounded-lg"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Niveau requis *
                        </label>
                        <select className="w-full p-2 border rounded-lg" required>
                          <option>Débutant</option>
                          <option>Intermédiaire</option>
                          <option>Avancé</option>
                          <option>Expert</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tarifs *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            className="w-full p-2 border rounded-lg pl-8"
                            required
                            placeholder="0.00"
                          />
                          <Euro className="w-4 h-4 absolute left-2 top-3 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Horaires */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Horaires *</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Jour
                        </label>
                        <select className="w-full p-2 border rounded-lg" required>
                          <option>Lundi</option>
                          <option>Mardi</option>
                          <option>Mercredi</option>
                          <option>Jeudi</option>
                          <option>Vendredi</option>
                          <option>Samedi</option>
                          <option>Dimanche</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Heure début
                          </label>
                          <input
                            type="time"
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Heure fin
                          </label>
                          <input
                            type="time"
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Médias et liens */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Médias et liens</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Photo / Logo *
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            accept="image/*"
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Site web
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            className="w-full p-2 border rounded-lg pl-8"
                            placeholder="https://"
                          />
                          <Link className="w-4 h-4 absolute left-2 top-3 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Réseaux sociaux
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            className="w-full p-2 border rounded-lg pl-8"
                            placeholder="https://"
                          />
                          <Link className="w-4 h-4 absolute left-2 top-3 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Responsable */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Responsable</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom du responsable *
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Informations du responsable *
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg"
                          required
                          placeholder="Téléphone, email..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description du responsable
                        </label>
                        <textarea
                          className="w-full p-2 border rounded-lg"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Coach */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Coach</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom du coach
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Informations du coach
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg"
                          placeholder="Téléphone, email..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description du coach
                        </label>
                        <textarea
                          className="w-full p-2 border rounded-lg"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Conditions particulières */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Conditions particulières</h4>
                    <div>
                      <textarea
                        className="w-full p-2 border rounded-lg"
                        rows={4}
                        placeholder="Équipement requis, restrictions d'âge, etc."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowNewActivity(false)}
                      className="px-4 py-2 border rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Créer l'activité
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Liste des activités */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Mes Activités</h3>
                {/* Table des activités... */}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Paramètres du Compte</h2>
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sauvegarder les modifications
              </button>
            </div>

            <div className="space-y-6">
              {/* Configuration générale */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Configuration générale</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Languages className="w-4 h-4 inline-block mr-2" />
                      Langue
                    </label>
                    <select 
                      className="w-full p-2 border rounded-lg"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as Language)}
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Volume2 className="w-4 h-4 inline-block mr-2" />
                      Volume des sons
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Préférences de notification */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Préférences de notification</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">Notifications par email</p>
                        <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">Notifications push</p>
                        <p className="text-sm text-gray-500">Recevoir des notifications sur le navigateur</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">Notifications d'activités</p>
                        <p className="text-sm text-gray-500">Notifications sur les nouvelles activités</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Options d'affichage */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Options d'affichage</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Thème</label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setTheme('light')}
                        className={`p-4 border rounded-lg flex flex-col items-center ${
                          theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <Sun className="w-6 h-6 mb-2" />
                        <span>Clair</span>
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`p-4 border rounded-lg flex flex-col items-center ${
                          theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <Moon className="w-6 h-6 mb-2" />
                        <span>Sombre</span>
                      </button>
                      <button
                        onClick={() => setTheme('system')}
                        className={`p-4 border rounded-lg flex flex-col items-center ${
                          theme === 'system' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <Settings className="w-6 h-6 mb-2" />
                        <span>Système</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modification du mot de passe */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Modification du mot de passe</h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="w-4 h-4 inline-block mr-2" />
                      Mot de passe actuel
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-lg"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="w-4 h-4 inline-block mr-2" />
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-lg"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="w-4 h-4 inline-block mr-2" />
                      Confirmer le nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-lg"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Mettre à jour le mot de passe
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MapPin, Cookie } from 'lucide-react';

export default function PersonalData() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    // Charger les préférences sauvegardées
    const savedGeolocation = localStorage.getItem('geolocationEnabled') === 'true';
    const savedCookies = localStorage.getItem('cookiesAccepted') === 'true';
    setGeolocationEnabled(savedGeolocation);
    setCookiesAccepted(savedCookies);
  }, []);

  const handleGeolocationToggle = async () => {
    if (!geolocationEnabled) {
      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        if (permission.state === 'granted' || permission.state === 'prompt') {
          setGeolocationEnabled(true);
          localStorage.setItem('geolocationEnabled', 'true');
        }
      } catch (error) {
        console.error('Erreur lors de la demande de géolocalisation:', error);
      }
    } else {
      setGeolocationEnabled(false);
      localStorage.setItem('geolocationEnabled', 'false');
    }
  };

  const handleCookiesToggle = () => {
    setCookiesAccepted(!cookiesAccepted);
    localStorage.setItem('cookiesAccepted', (!cookiesAccepted).toString());
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Données Personnelles</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Géolocalisation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Autorisez l'accès à votre position pour découvrir les activités à proximité.
            </p>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <label htmlFor="geolocation" className="font-medium">
                Autoriser la géolocalisation
              </label>
              <Switch
                id="geolocation"
                checked={geolocationEnabled}
                onCheckedChange={handleGeolocationToggle}
                className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              Cookies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Nous utilisons des cookies pour améliorer votre expérience et nos services.
            </p>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <label htmlFor="cookies" className="font-medium">
                Accepter les cookies
              </label>
              <Switch
                id="cookies"
                checked={cookiesAccepted}
                onCheckedChange={handleCookiesToggle}
                className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200"
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-sm text-gray-500">
          <p>
            Vos préférences sont automatiquement sauvegardées. Vous pouvez les modifier à tout moment.
          </p>
        </div>
      </div>
    </div>
  );
} 
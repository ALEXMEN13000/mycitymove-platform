import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { ActivityCard } from "@/components/ActivityCard";
import { ActivityFilters } from "@/components/ActivityFilters";
import { useSearchParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { activities } from "../data/activities";

const marseille_districts = [
  "1er arrondissement",
  "2ème arrondissement",
  "3ème arrondissement",
  "4ème arrondissement",
  "5ème arrondissement",
  "6ème arrondissement",
  "7ème arrondissement",
  "8ème arrondissement",
  "9ème arrondissement",
  "10ème arrondissement",
  "11ème arrondissement",
  "12ème arrondissement",
  "13ème arrondissement",
  "14ème arrondissement",
  "15ème arrondissement",
  "16ème arrondissement",
];

const daysOfWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/cours\s+de\s+/g, 'cours ')
    .replace(/séance\s+de\s+/g, 'séance ')
    .replace(/atelier\s+de\s+/g, 'atelier ')
    .replace(/\s+de\s+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Fonction pour calculer la distance entre deux points GPS en km
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance en km
};

// Fonction pour calculer la distance réelle en utilisant Google Maps Distance Matrix API
const calculateRealDistance = async (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }): Promise<number> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&mode=walking&key=${process.env.VITE_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    
    if (data.rows[0].elements[0].status === 'OK') {
      // La distance est retournée en mètres, on la convertit en kilomètres
      return data.rows[0].elements[0].distance.value / 1000;
    }
    throw new Error('Impossible de calculer la distance');
  } catch (error) {
    console.error('Erreur lors du calcul de la distance:', error);
    // En cas d'erreur, on utilise la distance à vol d'oiseau comme fallback
    return calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng);
  }
};

const Activities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [filters, setFilters] = useState({
    club: 'all',
    district: 'all',
    age: 'all',
    level: 'all',
    time: 'all',
    dayOfWeek: 'all',
    distance: 'all'
  });

  const matchesSearchTerms = (activity: any, searchTerms: string[]) => {
    const activityText = normalizeText(`${activity.title} ${activity.category} ${activity.subcategory} ${activity.location}`);
    
    const hasPrefix = searchTerms.some(term => ["cours", "séance", "atelier"].includes(term));
    if (hasPrefix) {
      const activityType = searchTerms.find(term => !["cours", "séance", "atelier"].includes(term));
      if (activityType) {
        return normalizeText(activity.title).includes(activityType) ||
               normalizeText(activity.subcategory).includes(activityType);
      }
    }
    
    return searchTerms.every(term => activityText.includes(term));
  };

  const matchesFilters = async (activity: any, filters: any) => {
    // Vérifier la distance en premier si le filtre de distance est actif
    if (filters.distance !== 'all' && userLocation && activity.coordinates) {
      try {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          activity.coordinates.lat,
          activity.coordinates.lng
        );
        const maxDistance = parseFloat(filters.distance);
        if (distance > maxDistance) {
          return false;
        }
      } catch (error) {
        console.error('Erreur lors du calcul de la distance pour', activity.title, ':', error);
        return false;
      }
    }

    // Vérifier le filtre de club
    if (filters.club !== 'all' && activity.clubName !== filters.club) {
      return false;
    }

    // Vérifier les autres filtres
    if (filters.district !== 'all' && activity.district !== filters.district) {
      return false;
    }

    if (filters.level !== 'all' && activity.level !== filters.level) {
      return false;
    }

    if (filters.dayOfWeek !== 'all' && activity.dayOfWeek !== filters.dayOfWeek) {
      return false;
    }

    if (filters.time !== 'all') {
      const activityStartHour = parseInt(activity.startTime.split(':')[0]);
      switch (filters.time) {
        case 'Matin (6h-12h)':
          if (activityStartHour < 6 || activityStartHour >= 12) return false;
          break;
        case 'Midi (12h-14h)':
          if (activityStartHour < 12 || activityStartHour >= 14) return false;
          break;
        case 'Après-midi (14h-18h)':
          if (activityStartHour < 14 || activityStartHour >= 18) return false;
          break;
        case 'Soir (18h-22h)':
          if (activityStartHour < 18 || activityStartHour >= 22) return false;
          break;
      }
    }

    return true;
  };

  // Fonction pour appliquer les filtres et le tri
  const applyFiltersAndSort = async (currentFilters: any, sortOrder: string, searchQuery: string) => {
    let filtered = [...activities];

    // Appliquer la recherche si elle existe
    if (searchQuery) {
      const searchTerms = normalizeText(searchQuery).split(' ');
      filtered = filtered.filter(activity => matchesSearchTerms(activity, searchTerms));
    }

    // Appliquer les filtres de manière asynchrone
    const filteredPromises = filtered.map(activity => matchesFilters(activity, currentFilters));
    const filterResults = await Promise.all(filteredPromises);
    filtered = filtered.filter((_, index) => filterResults[index]);

    // Si la localisation est activée, calculer les distances pour toutes les activités
    if (userLocation) {
      const activitiesWithDistance = await Promise.all(
        filtered.map(async (activity) => {
          const distance = await calculateRealDistance(userLocation, activity.coordinates);
          return { ...activity, distance };
        })
      );
      
      // Trier par distance si la localisation est activée
      filtered = activitiesWithDistance.sort((a, b) => a.distance - b.distance);
    } else {
      // Sinon, appliquer le tri par note
      filtered.sort((a, b) => {
        if (sortOrder === 'best') {
          return b.rating - a.rating;
        } else {
          return a.rating - b.rating;
        }
      });
    }

    console.log('Nombre d\'activités après filtrage:', filtered.length);
    setFilteredActivities(filtered);
  };

  // Gestionnaire de mise à jour de la localisation
  const handleLocationUpdate = async () => {
    const fixedLocation = {
      lat: 43.2988,
      lng: 5.3789
    };
    
    console.log('Mise à jour de la localisation:', fixedLocation);
    setUserLocation(fixedLocation);
    
    // Réappliquer les filtres et le tri par distance
    await applyFiltersAndSort(filters, searchParams.get('sort') || 'best', searchParams.get('q') || '');
    
    return fixedLocation;
  };

  // Gestionnaire de changement des filtres
  const handleFiltersChange = async (newFilters: any) => {
    console.log('Application des nouveaux filtres:', newFilters);
    console.log('Localisation actuelle:', userLocation);
    
    setFilters(newFilters);
    
    let filtered = [...activities];
    
    // Appliquer les filtres de manière asynchrone
    const filteredPromises = filtered.map(activity => matchesFilters(activity, newFilters));
    const filterResults = await Promise.all(filteredPromises);
    filtered = filtered.filter((_, index) => filterResults[index]);
    
    console.log('Nombre d\'activités après filtrage:', filtered.length);
    setFilteredActivities(filtered);
  };

  // Gestionnaire de changement du tri
  const handleSortChange = (order: string) => {
    setSearchParams(prev => {
      prev.set('sort', order);
      return prev;
    });
    applyFiltersAndSort(filters, order, searchParams.get('q') || '');
  };

  // Effet pour appliquer les filtres initiaux et la recherche
  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    const sortOrder = searchParams.get('sort') || 'best';
    applyFiltersAndSort(filters, sortOrder, searchQuery);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
          <ActivityFilters
            onFiltersChange={handleFiltersChange}
            onSortChange={handleSortChange}
            onLocationUpdate={handleLocationUpdate}
          />
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  {...activity}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Activities;
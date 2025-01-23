import { Link, useNavigate } from "react-router-dom";
import { Star, Calendar, MapPin, BarChart, Clock, User, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { activities } from "@/data/activities";
import { useFavorites } from "@/hooks/useFavorites";

// Sélectionner les 3 premières activités
const popularActivities = activities.slice(0, 3);

export function PopularActivities() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleRatingClick = (e: React.MouseEvent, activity: any) => {
    e.preventDefault();
    e.stopPropagation();
    const urlId = activity.title.toLowerCase()
      .replace(/séance de /g, 'seance-de-')
      .replace(/cours de /g, 'cours-de-')
      .replace(/ /g, '-')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    navigate(`/activity/${urlId}/reviews`);
  };

  const handleLocationClick = (e: React.MouseEvent, activity: any) => {
    e.preventDefault();
    e.stopPropagation();
    const address = `${activity.location}, ${activity.district}, Marseille, France`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-[#102A43]">Activités populaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularActivities.map((activity) => (
          <div key={activity.title} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative aspect-[4/3]">
              <img 
                src={activity.imageUrl} 
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <div 
                  className="flex items-center gap-1 bg-white rounded-full px-2 py-1 cursor-pointer hover:bg-gray-100"
                  onClick={(e) => handleRatingClick(e, activity)}
                >
                  <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                  <span className="font-medium">{activity.rating.toFixed(1)}</span>
                </div>
                <div 
                  className="flex items-center gap-1 bg-white rounded-full px-2 py-1 cursor-pointer hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (activity.id) {
                      toggleFavorite(activity.id);
                    }
                  }}
                >
                  <Heart className={`h-4 w-4 ${isFavorite(activity.id) ? 'fill-red-500 stroke-red-500' : ''}`} />
                </div>
                <div className="bg-[#102A43] text-white rounded-full px-3 py-1">
                  {activity.category}
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-[#102A43]">{activity.title}</h3>
              <p className="text-lg font-medium text-gray-600 mb-4">{activity.clubName}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400 shrink-0" />
                  <span className="text-gray-600">{activity.dayOfWeek}</span>
                </div>
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:text-blue-600 group"
                  onClick={(e) => handleLocationClick(e, activity)}
                >
                  <MapPin className="h-5 w-5 text-gray-400 shrink-0 group-hover:text-blue-600" />
                  <div className="flex flex-col">
                    <span className="text-gray-600 hover:underline">{activity.location}</span>
                    <span className="text-sm text-gray-500">{activity.district}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-gray-400 shrink-0" />
                  <span className="text-gray-600">{activity.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-400 shrink-0" />
                  <span className="text-gray-600">{activity.ageRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400 shrink-0" />
                  <span className="text-gray-600">{activity.startTime} - {activity.endTime}</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <Button 
                  variant="outline" 
                  className="flex-1 mr-4"
                  onClick={() => {
                    const urlId = activity.title.toLowerCase()
                      .replace(/séance de /g, 'seance-de-')
                      .replace(/cours de /g, 'cours-de-')
                      .replace(/ /g, '-')
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, '');
                    navigate(`/activity/${urlId}`);
                  }}
                >
                  Voir les détails
                </Button>
                <img 
                  src={activity.clubLogo} 
                  alt={activity.clubName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
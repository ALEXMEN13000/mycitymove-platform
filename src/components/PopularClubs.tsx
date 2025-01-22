import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Activity } from 'lucide-react';

const popularClubs = [
  {
    id: 1,
    name: "Club Sportif Marseille",
    location: "Centre-ville (1er)",
    rating: 4.5,
    activitiesCount: 12,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=60",
    link: "/clubs"
  },
  {
    id: 2,
    name: "Tennis Club Phocéen",
    location: "Prado (8ème)",
    rating: 4.8,
    activitiesCount: 8,
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&auto=format&fit=crop&q=60",
    link: "/clubs"
  },
  {
    id: 3,
    name: "Yoga & Bien-être",
    location: "Castellane (6ème)",
    rating: 4.9,
    activitiesCount: 20,
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&auto=format&fit=crop&q=60",
    link: "/clubs"
  }
];

export function PopularClubs() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-[#102A43]">Clubs populaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularClubs.map((club) => (
          <div key={club.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative aspect-[4/3]">
              <img 
                src={club.image} 
                alt={club.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-[#102A43]">{club.name}</h3>
              <div className="flex items-center gap-1 text-gray-600 mb-3">
                <MapPin size={16} />
                <span>{club.location}</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                  <span className="font-semibold">{club.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity size={16} />
                  <span>{club.activitiesCount} activités</span>
                </div>
              </div>
              <Link 
                to={club.link}
                className="block w-full bg-[#102A43] text-white text-center py-3 rounded-xl hover:bg-[#1A365D] transition-colors"
              >
                Voir le club
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
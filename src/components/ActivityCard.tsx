import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Star, Calendar, MapPin, Clock, User, BarChart, Building, Navigation } from "lucide-react";
import { Link } from "react-router-dom";

interface ActivityCardProps {
  id?: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  clubLogo: string;
  clubName: string;
  rating: number;
  dayOfWeek: string;
  district: string;
  level: string;
  ageRange?: string;
  startTime: string;
  endTime: string;
  distance?: number;
}

export const ActivityCard = ({ 
  id, 
  title, 
  category, 
  location, 
  imageUrl,
  clubLogo,
  clubName,
  rating,
  dayOfWeek,
  district,
  level,
  ageRange,
  startTime,
  endTime,
  distance
}: ActivityCardProps) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    const urlId = title.toLowerCase()
      .replace(/séance de /g, 'seance-de-')
      .replace(/cours de /g, 'cours-de-')
      .replace(/ /g, '-')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    navigate(`/activity/${urlId}`);
  };

  const handleRatingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const urlId = title.toLowerCase()
      .replace(/séance de /g, 'seance-de-')
      .replace(/cours de /g, 'cours-de-')
      .replace(/ /g, '-')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    navigate(`/activity/${urlId}/reviews`);
  };

  const handleLocationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const address = `${location}, ${district}, Marseille, France`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge 
            className="bg-white text-black flex items-center gap-1 cursor-pointer hover:bg-gray-100"
            onClick={handleRatingClick}
          >
            <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
            {rating.toFixed(1)}
          </Badge>
          <Badge className="bg-accent">{category}</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="font-medium">{dayOfWeek}</span>
          </div>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-blue-600 group"
            onClick={handleLocationClick}
          >
            <MapPin className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
            <div className="flex flex-col">
              <span className="line-clamp-1 underline">{location}</span>
              <span className="text-xs text-gray-500">{district}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-gray-500" />
            <span>{level || "Tous niveaux"}</span>
          </div>
          {ageRange && (
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <span>{ageRange}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>{startTime} - {endTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-gray-500" />
            <span className="line-clamp-1">{clubName}</span>
          </div>
          {distance !== undefined && (
            <div className="flex items-center gap-2 text-blue-600">
              <Navigation className="h-5 w-5" />
              <span>{distance.toFixed(1)} km</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4">
        <Button 
          variant="outline" 
          className="flex-1 mr-4"
          onClick={handleDetailsClick}
        >
          Voir les détails
        </Button>
        <Avatar className="h-12 w-12 border-2 border-white shadow-md" title={clubName}>
          <AvatarImage src={clubLogo} alt={clubName} />
        </Avatar>
      </CardFooter>
    </Card>
  );
};
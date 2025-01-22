import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Building,
  Star,
  Euro,
  BarChart,
  Award,
  Info,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  Phone,
  Mail
} from "lucide-react";
import { activities } from "../data/activities";

export default function ActivityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Trouver l'activité correspondante
  const activity = activities.find(a => {
    const urlId = a.title.toLowerCase()
      .replace(/séance de /g, 'seance-de-')
      .replace(/cours de /g, 'cours-de-')
      .replace(/ /g, '-')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return urlId === id;
  });

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Activité non trouvée</h1>
            <Link to="/activities">
              <Button className="mt-4">Retour aux activités</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleLocationClick = () => {
    const address = `${activity.location}, ${activity.district}, Marseille, France`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleReviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/login', { 
      state: { 
        returnTo: `/activity/${id}/review/new`,
        message: "Connectez-vous pour déposer un avis" 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* En-tête de l'activité */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-8">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Link to={`/activity/${id}/reviews`}>
              <Badge className="bg-white text-black flex items-center gap-1 cursor-pointer hover:bg-gray-100 transition-colors">
                <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                {activity.rating.toFixed(1)}
              </Badge>
            </Link>
            <Badge className="bg-accent">{activity.category}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{activity.title}</h1>
              {activity.description && (
                <p className="text-gray-600">{activity.description}</p>
              )}
            </div>

            {/* Détails de l'activité */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Détails de l'activité</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-gray-500">Jour</div>
                    <div>{activity.dayOfWeek}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-500">Horaires</div>
                    <div>{activity.startTime} - {activity.endTime}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-500">Niveau</div>
                    <div>{activity.level}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-500">Âge</div>
                    <div>{activity.ageRange}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="font-medium text-gray-500">Adresse</div>
                    <div 
                      className="cursor-pointer hover:text-blue-600"
                      onClick={handleLocationClick}
                    >
                      <div className="underline">{activity.location}</div>
                      <div className="text-sm text-gray-500">{activity.district}</div>
                    </div>
                  </div>
                  <div className="md:col-span-2 border-t pt-4">
                    <div className="font-medium text-gray-500 mb-2">Contact responsable</div>
                    <div className="space-y-2">
                      <div className="text-sm">{activity.contact.responsable}</div>
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${activity.contact.email}`} className="hover:underline">
                          {activity.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${activity.contact.phone.replace(/\s/g, '')}`} className="hover:underline">
                          {activity.contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tarifs */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Tarifs</h2>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{activity.prices?.session || activity.price}€</span>
                  <Badge>Par séance</Badge>
                </div>
                {activity.prices && (
                  <div className="pt-6 border-t">
                    <h4 className="font-semibold mb-4">Autres formules</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Mensuel</span>
                        <span className="font-medium">{activity.prices.month}€</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Trimestriel</span>
                        <span className="font-medium">{activity.prices.quarter}€</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Annuel</span>
                        <span className="font-medium">{activity.prices.year}€</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Coach */}
            {activity.coach && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Votre coach</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${activity.coach.name}`} />
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{activity.coach.name}</h3>
                        <p className="text-gray-600">{activity.coach.experience} d'expérience</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{activity.coach.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {activity.coach.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Club */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={activity.clubLogo} alt={activity.clubName} />
                  </Avatar>
                  <h2 className="text-xl font-semibold">{activity.clubName}</h2>
                </div>
                {activity.clubDescription && (
                  <p className="text-gray-600 mb-4">{activity.clubDescription}</p>
                )}
                <div className="space-y-4">
                  <Button 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => window.location.href = `tel:${activity.socialLinks.phone.replace(/\s/g, '')}`}
                  >
                    <Phone className="h-4 w-4" />
                    Contacter le club
                  </Button>
                  
                  {/* Social Links */}
                  <div className="flex flex-wrap gap-2 justify-center pt-4 border-t">
                    <a 
                      href={activity.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="Site web"
                    >
                      <Globe className="h-5 w-5 text-gray-600" />
                    </a>
                    <a 
                      href={activity.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="Instagram"
                    >
                      <Instagram className="h-5 w-5 text-gray-600" />
                    </a>
                    <a 
                      href={activity.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="Facebook"
                    >
                      <Facebook className="h-5 w-5 text-gray-600" />
                    </a>
                    <a 
                      href={activity.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5 text-gray-600" />
                    </a>
                    <a 
                      href={activity.socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="WhatsApp"
                    >
                      <MessageCircle className="h-5 w-5 text-gray-600" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Link to={`/activity/${id}/reviews`}>
                  <Button className="w-full bg-[#4299E1] hover:bg-[#3182CE]">
                    Voir les avis
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleReviewClick}
                >
                  Déposer un avis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 
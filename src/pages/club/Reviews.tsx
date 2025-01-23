import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  BarChart3, 
  Calendar, 
  MessageSquare,
  Settings,
  Building2,
  Shield,
  Flag,
  MoreVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Simuler des données d'avis (à remplacer par de vraies données)
const reviews = [
  /*{
    id: 1,
    author: "Jean Dupont",
    rating: 4,
    date: "2024-02-15",
    content: "Très bonne activité, je recommande !",
    activity: "Tennis",
    response: null
  }*/
];

const Reviews = () => {
  const [replyText, setReplyText] = React.useState<{[key: number]: string}>({});

  const handleReply = (reviewId: number) => {
    // TODO: Implémenter la logique de réponse
    console.log('Réponse à l\'avis', reviewId, replyText[reviewId]);
  };

  const handleReport = (reviewId: number) => {
    // TODO: Implémenter la logique de signalement
    console.log('Signalement de l\'avis', reviewId);
  };

  const sidebarItems = [
    { label: 'Profil Club', icon: Building2, link: '/club/profile' },
    { label: 'Tableau de bord', icon: BarChart3, link: '/club/dashboard' },
    { label: 'Activités', icon: Calendar, link: '/club/activities' },
    { label: 'Avis', icon: MessageSquare, active: true, link: '/club/reviews' },
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
            <h2 className="text-2xl font-bold">Gestion des Avis</h2>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Aucun avis</h3>
              <p className="text-gray-600">
                Vous n'avez pas encore reçu d'avis sur vos activités.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.author}</span>
                        <span className="text-sm text-gray-500">• {review.activity}</span>
                        <span className="text-sm text-gray-500">• {new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleReport(review.id)}>
                          <Flag className="w-4 h-4 mr-2" />
                          Signaler
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-gray-700 mb-4">{review.content}</p>

                  {review.response && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-sm font-semibold mb-2">Votre réponse :</p>
                      <p className="text-gray-700">{review.response}</p>
                    </div>
                  )}

                  {!review.response && (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Répondre à cet avis..."
                        value={replyText[review.id] || ''}
                        onChange={(e) => setReplyText({
                          ...replyText,
                          [review.id]: e.target.value
                        })}
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={() => handleReply(review.id)}
                          disabled={!replyText[review.id]}
                        >
                          Répondre
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews; 
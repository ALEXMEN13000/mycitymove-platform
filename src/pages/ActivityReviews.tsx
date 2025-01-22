import { useParams, Link } from 'react-router-dom';
import { Star, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';

// Base de données exemple (à remplacer par une vraie API)
const reviewsData = {
  'seance-de-yoga': [
    {
      id: 1,
      author: "Marie L.",
      rating: 5,
      date: "2024-03-15",
      content: "Une excellente séance de yoga ! Sarah est une instructrice très attentive et bienveillante. L'ambiance est parfaite pour se détendre et progresser à son rythme.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 2,
      author: "Pierre D.",
      rating: 4,
      date: "2024-03-10",
      content: "Très bon studio, propre et bien équipé. Les cours sont adaptés à tous les niveaux. Seul petit bémol : le parking parfois difficile à trouver.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 3,
      author: "Sophie M.",
      rating: 5,
      date: "2024-03-05",
      content: "Je recommande vivement ! Les cours sont variés et l'ambiance est très zen. J'ai fait beaucoup de progrès depuis que j'ai commencé.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&auto=format&q=80"
    }
  ],
  'cours-de-tennis': [
    {
      id: 1,
      author: "Lucas R.",
      rating: 5,
      date: "2024-03-14",
      content: "Thomas est un excellent coach ! Il sait s'adapter à chaque niveau et donne des conseils très pertinents. Les courts sont bien entretenus.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 2,
      author: "Emma B.",
      rating: 4,
      date: "2024-03-08",
      content: "Très bonne ambiance et cours de qualité. Le club est bien équipé et l'équipe est sympathique.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&auto=format&q=80"
    }
  ],
  'cours-de-theatre': [
    {
      id: 1,
      author: "Julie P.",
      rating: 5,
      date: "2024-03-12",
      content: "Une expérience enrichissante ! Marc est un excellent professeur qui sait transmettre sa passion. Les exercices sont variés et permettent de progresser rapidement.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 2,
      author: "Thomas L.",
      rating: 5,
      date: "2024-03-07",
      content: "Superbe ambiance et cours très intéressants. On apprend beaucoup tout en s'amusant.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 3,
      author: "Sarah C.",
      rating: 4,
      date: "2024-03-01",
      content: "Très bon cours, le professeur est pédagogue et patient. Le théâtre est magnifique.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&auto=format&q=80"
    }
  ],
  'cours-de-piano': [
    {
      id: 1,
      author: "Léa M.",
      rating: 5,
      date: "2024-03-13",
      content: "Claire est une excellente professeure, très patiente et pédagogue. Le conservatoire dispose d'instruments de qualité.",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 2,
      author: "Antoine B.",
      rating: 4,
      date: "2024-03-06",
      content: "Bonne progression grâce à un enseignement structuré. L'ambiance est studieuse mais détendue.",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop&auto=format&q=80"
    }
  ],
  'cours-de-natation': [
    {
      id: 1,
      author: "Paul R.",
      rating: 4,
      date: "2024-03-14",
      content: "Nicolas est un excellent maître-nageur. Les cours sont bien structurés et adaptés à chaque niveau.",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 2,
      author: "Marine L.",
      rating: 5,
      date: "2024-03-09",
      content: "Très satisfaite des cours. La piscine est propre et bien entretenue. Le coach est attentif et professionnel.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 3,
      author: "Hugo D.",
      rating: 4,
      date: "2024-03-02",
      content: "Bon encadrement et progression constante. Les horaires sont pratiques.",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop&auto=format&q=80"
    }
  ],
  'cours-de-guitare': [
    {
      id: 1,
      author: "Camille P.",
      rating: 4,
      date: "2024-03-11",
      content: "Antoine est un super prof de guitare, passionné et pédagogue. L'école est bien située et accueillante.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 2,
      author: "Maxime T.",
      rating: 5,
      date: "2024-03-04",
      content: "Excellente école de musique. Les cours sont personnalisés et le matériel est de qualité.",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=50&h=50&fit=crop&auto=format&q=80"
    }
  ],
  'cours-de-danse-classique': [
    {
      id: 1,
      author: "Clara S.",
      rating: 5,
      date: "2024-03-15",
      content: "Marie est une professeure exceptionnelle. Sa technique et sa pédagogie sont remarquables.",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 2,
      author: "Lucie B.",
      rating: 5,
      date: "2024-03-08",
      content: "Le studio est magnifique et l'ambiance est très professionnelle. Les cours sont intenses mais gratifiants.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&auto=format&q=80"
    }
  ],
  'atelier-peinture': [
    {
      id: 1,
      author: "Vincent M.",
      rating: 5,
      date: "2024-03-13",
      content: "Sophie est une artiste talentueuse et une excellente pédagogue. L'atelier est lumineux et inspirant.",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 2,
      author: "Alice D.",
      rating: 4,
      date: "2024-03-06",
      content: "Très bon cours pour découvrir différentes techniques. Le matériel fourni est de qualité.",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop&auto=format&q=80"
    }
  ],
  'cours-de-boxe': [
    {
      id: 1,
      author: "Romain L.",
      rating: 5,
      date: "2024-03-14",
      content: "David est un excellent coach, très professionnel. Les séances sont intenses et motivantes.",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 2,
      author: "Sophie B.",
      rating: 4,
      date: "2024-03-07",
      content: "Super ambiance et bon encadrement. Les cours sont adaptés à tous les niveaux.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&auto=format&q=80"
    }
  ],
  'meditation-guidee': [
    {
      id: 1,
      author: "Julie M.",
      rating: 5,
      date: "2024-03-15",
      content: "Laura est une guide exceptionnelle. Les séances sont très apaisantes et bénéfiques.",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 2,
      author: "Thomas R.",
      rating: 5,
      date: "2024-03-08",
      content: "Le centre est un véritable havre de paix. Les séances sont très bien structurées.",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 3,
      author: "Emma L.",
      rating: 5,
      date: "2024-03-01",
      content: "Une expérience transformative. Je me sens beaucoup plus sereine depuis que j'ai commencé.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&auto=format&q=80"
    }
  ],
  'cours-de-football': [
    {
      id: 1,
      author: "Lucas B.",
      rating: 5,
      date: "2024-03-12",
      content: "Julien est un excellent entraîneur. Les séances sont dynamiques et très formatrices.",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=50&h=50&fit=crop&auto=format&q=80"
    },
    {
      id: 2,
      author: "Nathan M.",
      rating: 5,
      date: "2024-03-05",
      content: "S'entraîner au Vélodrome est une expérience unique. Le niveau technique est excellent.",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop&auto=format&q=80"
    }
  ]
};

const activitiesData = {
  'seance-de-yoga': {
    title: "Séance de Yoga",
    rating: 4.5,
    reviewsCount: 12
  },
  'cours-de-tennis': {
    title: "Cours de Tennis",
    rating: 4.8,
    reviewsCount: 8
  },
  'cours-de-theatre': {
    title: "Cours de Théâtre",
    rating: 4.7,
    reviewsCount: 15
  }
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? "fill-yellow-400 stroke-yellow-400"
              : "fill-gray-200 stroke-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export function ActivityReviews() {
  const { activityId } = useParams();
  const [newReview, setNewReview] = useState('');
  const [activity, setActivity] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (activityId) {
      setActivity(activitiesData[activityId as keyof typeof activitiesData]);
      setReviews(reviewsData[activityId as keyof typeof reviewsData] || []);
    }
  }, [activityId]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la soumission de l'avis
    console.log("Nouvel avis pour", activityId, ":", newReview);
    setNewReview('');
  };

  if (!activity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Activité non trouvée</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <Link
          to={`/activity/${activityId}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Retour à l'activité</span>
        </Link>
        <h1 className="text-3xl font-bold mb-2">Avis - {activity.title}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <StarRating rating={activity.rating} />
            <span className="font-semibold">{activity.rating}</span>
          </div>
          <span className="text-gray-600">
            {activity.reviewsCount} avis au total
          </span>
        </div>
      </div>

      {/* Formulaire pour ajouter un avis */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Donnez votre avis sur {activity.title}</h2>
        <form onSubmit={handleSubmitReview}>
          <Textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Partagez votre expérience..."
            className="mb-4"
          />
          <Button type="submit">
            Publier l'avis
          </Button>
        </form>
      </div>

      {/* Liste des avis */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{review.author}</h3>
                  <span className="text-gray-500 text-sm">
                    {new Date(review.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-3 text-gray-600">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
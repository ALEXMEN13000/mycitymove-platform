import React, { useState } from 'react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, Pencil, Trash2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// Données de test pour les avis
const reviews = [
  {
    id: 1,
    activityName: 'Yoga Flow',
    clubName: 'Studio Zen',
    rating: 4.5,
    comment: 'Great experience! The instructor was very knowledgeable and patient. The facilities were clean and well-maintained. I would definitely recommend this ...',
    date: '15/03/2024'
  },
  // Ajoutez plus d'avis si nécessaire
];

export default function Reviews() {
  const [sortBy, setSortBy] = useState('date');

  // Fonction pour rendre les étoiles
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : index < rating
            ? 'text-yellow-400 fill-yellow-400 opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <UserLayout>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Mes Avis</h1>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center">
              <span>Sort by Date</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="rating">Note</SelectItem>
            <SelectItem value="activity">Activité</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Liste des avis */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="space-y-4">
              {/* En-tête de l'avis */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    <Link to={`/activity/${review.id}`} className="text-blue-600 hover:underline">
                      {review.activityName}
                    </Link>
                    <span className="text-gray-600"> at </span>
                    <Link to={`/club/${review.id}`} className="text-blue-600 hover:underline">
                      {review.clubName}
                    </Link>
                  </h2>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                    <span className="ml-2 text-gray-600">{review.rating}/5</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Pencil className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Trash2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Contenu de l'avis */}
              <div>
                <p className="text-gray-600">{review.comment}</p>
                <button className="text-blue-600 hover:underline mt-2">
                  Show more
                </button>
              </div>

              {/* Date de publication */}
              <div className="text-sm text-gray-500">
                Published on {review.date}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </UserLayout>
  );
} 
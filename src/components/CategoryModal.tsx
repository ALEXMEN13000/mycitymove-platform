import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryModalProps {
  category: string;
  isOpen: boolean;
  onClose: () => void;
}

const subcategories = {
  sport: [
    { id: 'tennis', name: 'Tennis' },
    { id: 'football', name: 'Football' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'natation', name: 'Natation' },
    { id: 'course', name: 'Course à pied' },
    { id: 'autre', name: 'Autre' }
  ],
  musique: [
    { id: 'piano', name: 'Piano' },
    { id: 'guitare', name: 'Guitare' },
    { id: 'chant', name: 'Chant' },
    { id: 'batterie', name: 'Batterie' },
    { id: 'violon', name: 'Violon' },
    { id: 'autre', name: 'Autre' }
  ],
  'bien-être': [
    { id: 'yoga', name: 'Yoga' },
    { id: 'meditation', name: 'Méditation' },
    { id: 'pilates', name: 'Pilates' },
    { id: 'massage', name: 'Massage' },
    { id: 'autre', name: 'Autre' }
  ],
  art: [
    { id: 'peinture', name: 'Peinture' },
    { id: 'sculpture', name: 'Sculpture' },
    { id: 'theatre', name: 'Théâtre' },
    { id: 'danse', name: 'Danse' },
    { id: 'autre', name: 'Autre' }
  ]
};

export function CategoryModal({ category, isOpen, onClose }: CategoryModalProps) {
  if (!isOpen) return null;

  const currentSubcategories = subcategories[category as keyof typeof subcategories] || [];

  return (
    <div 
      className="fixed inset-0 bg-[#102A43]/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#102A43] capitalize">
              {category}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <p className="text-lg text-gray-600 mb-8">
            Sélectionnez une activité pour découvrir les détails
          </p>

          <div className="grid grid-cols-2 gap-4">
            {currentSubcategories.map((sub) => (
              <Link
                key={sub.id}
                to={`/activities?subcategory=${sub.name.toLowerCase()}`}
                className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl p-4 text-[#102A43]"
                onClick={onClose}
              >
                <span className="text-lg">
                  {sub.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
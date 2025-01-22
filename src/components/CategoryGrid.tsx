import { useState } from "react";
import { Link } from "react-router-dom";
import { Dumbbell, Music, Heart, Palette } from "lucide-react";
import { CategoryModal } from "./CategoryModal";

const categories = [
  {
    id: "sport",
    name: "Sport",
    icon: Dumbbell,
  },
  {
    id: "musique",
    name: "Musique",
    icon: Music,
  },
  {
    id: "bien-être",
    name: "Bien-être",
    icon: Heart,
  },
  {
    id: "art",
    name: "Art",
    icon: Palette,
  },
];

export function CategoryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-[#102A43]">
          Découvrez vos activités préférées sur CLUBCENTER
        </h2>
        <p className="text-xl text-gray-600">
          Explorez notre sélection d'activités variées et trouvez celle qui vous correspond. Sport, musique, bien-être ou art, il y en a pour tous les goûts !
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 text-left flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-6 flex items-center justify-center">
                <category.icon 
                  className="w-12 h-12 text-[#102A43] stroke-[1.5]" 
                  style={{ 
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold text-[#102A43]">
                {category.name}
              </h3>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <Link to="/activities">
          <button className="bg-[#102A43] text-white px-8 py-3 rounded-lg hover:bg-[#1A365D] transition-colors">
            Toutes les activités
          </button>
        </Link>
      </div>

      <CategoryModal
        category={selectedCategory || ""}
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </div>
  );
}
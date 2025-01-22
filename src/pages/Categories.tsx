import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    title: "Sport",
    subcategories: [
      { name: "Tennis", image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6" },
      { name: "Natation", image: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50" },
      { name: "Boxe", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed" },
      { name: "Football", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55" },
      { name: "Basketball", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc" },
    ],
  },
  {
    title: "Musique",
    subcategories: [
      { name: "Piano", image: "https://images.unsplash.com/photo-1552422535-c45813c61732" },
      { name: "Guitare", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1" },
      { name: "Violon", image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec" },
    ],
  },
  {
    title: "Bien-être",
    subcategories: [
      { name: "Yoga", image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5" },
      { name: "Méditation", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773" },
      { name: "Pilates", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a" },
    ],
  },
  {
    title: "Art",
    subcategories: [
      { name: "Théâtre", image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf" },
      { name: "Peinture", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b" },
      { name: "Photographie", image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848" },
    ],
  },
  {
    title: "Danse",
    subcategories: [
      { name: "Classique", image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434" },
    ],
  },
];

export const Categories = () => {
  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white">Catégories d'activités</h1>
        <div className="grid gap-8">
          {categories.map((category) => (
            <div key={category.title}>
              <h2 className="text-2xl font-semibold mb-4 text-white">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.name}
                    to={`/activities?category=${category.title}&subcategory=${subcategory.name}`}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="relative h-48">
                          <img
                            src={subcategory.image}
                            alt={subcategory.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                            <h3 className="text-white text-xl font-semibold">
                              {subcategory.name}
                            </h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}; 
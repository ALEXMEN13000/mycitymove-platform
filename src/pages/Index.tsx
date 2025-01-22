import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { PopularActivities } from "@/components/PopularActivities";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-20 md:pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#102A43] leading-tight">
            Trouvez votre club idéal à Marseille
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez les meilleures activités sportives et culturelles près de chez vous
          </p>
          <div className="px-4 md:px-0 mb-12">
            <SearchBar />
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4 md:px-12 mb-16">
            <Button 
              asChild 
              size="lg" 
              className="bg-[#4299E1] hover:bg-[#3182CE] text-lg py-6 px-8 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <Link to="/register" className="flex items-center justify-center gap-2">
                Inscris-toi dès maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg"
              className="bg-[#4299E1] hover:bg-[#3182CE] text-lg py-6 px-8 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <Link to="/club/register" className="flex items-center justify-center gap-2">
                Propose des activités d'exception
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="space-y-8 md:space-y-12">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Catégories
            </h2>
            <CategoryGrid />
          </section>

          <section>
            <PopularActivities />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
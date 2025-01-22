import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (location.pathname === "/") {
        // Sur la page d'accueil, rediriger vers la page des activités
        navigate(`/activities?search=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        // Sur la page des activités, mettre à jour la recherche
        onSearch?.(searchQuery.trim());
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher une activité à Marseille..."
        className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-lg bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:border-[#102A43]"
      />
    </form>
  );
}
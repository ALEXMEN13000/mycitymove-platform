import { useState, useEffect } from 'react';
import { favoritesService } from '@/services/favorites';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  // Charger les favoris au chargement et quand l'utilisateur change
  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const loadFavorites = async () => {
    if (!user) return;
    try {
      const userFavorites = await favoritesService.getUserFavorites(user.id);
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
      toast.error('Impossible de charger vos favoris');
    }
  };

  const toggleFavorite = async (activityId: string) => {
    if (!user) {
      toast.error('Vous devez être connecté pour ajouter des favoris');
      return;
    }

    try {
      const isFav = await favoritesService.isFavorite(user.id, activityId);
      
      if (isFav) {
        await favoritesService.removeFavorite(user.id, activityId);
        setFavorites(prev => prev.filter(id => id !== activityId));
        toast.success('Activité retirée des favoris');
      } else {
        await favoritesService.addFavorite(user.id, activityId);
        setFavorites(prev => [...prev, activityId]);
        toast.success('Activité ajoutée aux favoris');
      }
    } catch (error) {
      console.error('Erreur lors de la modification des favoris:', error);
      toast.error('Une erreur est survenue');
    }
  };

  const isFavorite = (activityId: string) => {
    return favorites.includes(activityId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
}; 
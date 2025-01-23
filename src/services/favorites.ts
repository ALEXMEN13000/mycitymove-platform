import { supabase } from '@/lib/supabase';

export const favoritesService = {
  // Récupérer tous les favoris d'un utilisateur
  async getUserFavorites(userId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('activity_id')
      .eq('user_id', userId);

    if (error) throw error;
    return data.map(favorite => favorite.activity_id);
  },

  // Ajouter un favori
  async addFavorite(userId: string, activityId: string) {
    const { error } = await supabase
      .from('favorites')
      .insert([
        { user_id: userId, activity_id: activityId }
      ]);

    if (error) throw error;
  },

  // Supprimer un favori
  async removeFavorite(userId: string, activityId: string) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('activity_id', activityId);

    if (error) throw error;
  },

  // Vérifier si une activité est en favori
  async isFavorite(userId: string, activityId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('activity_id', activityId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  }
}; 
import { supabase } from '@/lib/supabase'

export type ClubProfile = {
  id: string
  name: string
  description?: string
  address?: string
  phone?: string
  email: string
}

export type MembershipRole = 'owner' | 'admin' | 'member'

export const clubs = {
  // Obtenir tous les clubs
  async getAllClubs() {
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  },

  // Obtenir un club par son ID
  async getClubById(id: string) {
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Mettre à jour un club
  async updateClub(id: string, updates: Partial<ClubProfile>) {
    const { error } = await supabase
      .from('clubs')
      .update(updates)
      .eq('id', id)

    if (error) throw error
  },

  // Supprimer un club
  async deleteClub(id: string) {
    const { error } = await supabase
      .from('clubs')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Obtenir les membres d'un club
  async getClubMembers(clubId: string) {
    const { data, error } = await supabase
      .from('memberships')
      .select(`
        user_id,
        role,
        users (
          id,
          email,
          full_name
        )
      `)
      .eq('club_id', clubId)

    if (error) throw error
    return data
  },

  // Ajouter un membre au club
  async addMember(clubId: string, userId: string, role: MembershipRole = 'member') {
    const { error } = await supabase
      .from('memberships')
      .insert({
        club_id: clubId,
        user_id: userId,
        role
      })

    if (error) throw error
  },

  // Mettre à jour le rôle d'un membre
  async updateMemberRole(clubId: string, userId: string, role: MembershipRole) {
    const { error } = await supabase
      .from('memberships')
      .update({ role })
      .match({ club_id: clubId, user_id: userId })

    if (error) throw error
  },

  // Retirer un membre du club
  async removeMember(clubId: string, userId: string) {
    const { error } = await supabase
      .from('memberships')
      .delete()
      .match({ club_id: clubId, user_id: userId })

    if (error) throw error
  },

  // Vérifier si un utilisateur est membre d'un club
  async checkMembership(clubId: string, userId: string) {
    const { data, error } = await supabase
      .from('memberships')
      .select('role')
      .match({ club_id: clubId, user_id: userId })
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = not found
    return data
  },

  // Obtenir tous les clubs dont l'utilisateur est membre
  async getUserClubs(userId: string) {
    const { data, error } = await supabase
      .from('memberships')
      .select(`
        role,
        clubs (*)
      `)
      .eq('user_id', userId)

    if (error) throw error
    return data
  }
} 
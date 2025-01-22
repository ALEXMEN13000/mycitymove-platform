import { supabase } from '@/lib/supabase'

export interface Member {
  id: string
  name: string
  email: string
  role: 'admin' | 'member'
  joinedAt: string
}

export interface MembershipRequest {
  id: string
  userId: string
  clubId: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
  user: {
    name: string
    email: string
  }
}

export const membersService = {
  // Récupérer tous les membres d'un club
  async getClubMembers(clubId: string) {
    const { data, error } = await supabase
      .from('memberships')
      .select(`
        user_id,
        role,
        created_at,
        users (
          id,
          name,
          email
        )
      `)
      .eq('club_id', clubId)
      .eq('status', 'accepted')

    if (error) throw error

    return data.map((membership): Member => ({
      id: membership.user_id,
      name: membership.users.name,
      email: membership.users.email,
      role: membership.role,
      joinedAt: new Date(membership.created_at).toLocaleDateString('fr-FR')
    }))
  },

  // Récupérer les demandes d'inscription en attente
  async getPendingRequests(clubId: string) {
    const { data, error } = await supabase
      .from('memberships')
      .select(`
        id,
        user_id,
        club_id,
        status,
        created_at,
        users (
          name,
          email
        )
      `)
      .eq('club_id', clubId)
      .eq('status', 'pending')

    if (error) throw error

    return data.map((request): MembershipRequest => ({
      id: request.id,
      userId: request.user_id,
      clubId: request.club_id,
      status: request.status,
      createdAt: new Date(request.created_at).toLocaleDateString('fr-FR'),
      user: {
        name: request.users.name,
        email: request.users.email
      }
    }))
  },

  // Accepter une demande d'inscription
  async acceptRequest(requestId: string) {
    const { error } = await supabase
      .from('memberships')
      .update({ status: 'accepted' })
      .eq('id', requestId)

    if (error) throw error
  },

  // Refuser une demande d'inscription
  async rejectRequest(requestId: string) {
    const { error } = await supabase
      .from('memberships')
      .update({ status: 'rejected' })
      .eq('id', requestId)

    if (error) throw error
  },

  // Changer le rôle d'un membre
  async updateMemberRole(clubId: string, userId: string, role: 'admin' | 'member') {
    const { error } = await supabase
      .from('memberships')
      .update({ role })
      .eq('club_id', clubId)
      .eq('user_id', userId)

    if (error) throw error
  },

  // Retirer un membre du club
  async removeMember(clubId: string, userId: string) {
    const { error } = await supabase
      .from('memberships')
      .delete()
      .eq('club_id', clubId)
      .eq('user_id', userId)

    if (error) throw error
  },

  // Inviter un utilisateur par email
  async inviteByEmail(clubId: string, email: string) {
    // D'abord, vérifier si l'utilisateur existe
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (userError) throw userError

    if (!user) {
      throw new Error('Utilisateur non trouvé')
    }

    // Ensuite, créer une demande d'inscription
    const { error } = await supabase
      .from('memberships')
      .insert({
        club_id: clubId,
        user_id: user.id,
        status: 'pending',
        role: 'member'
      })

    if (error) throw error
  },

  // Obtenir les statistiques des membres
  async getMemberStats(clubId: string) {
    const { data: totalMembers, error: totalError } = await supabase
      .from('memberships')
      .select('id', { count: 'exact' })
      .eq('club_id', clubId)
      .eq('status', 'accepted')

    const { data: newMembers, error: newError } = await supabase
      .from('memberships')
      .select('id', { count: 'exact' })
      .eq('club_id', clubId)
      .eq('status', 'accepted')
      .gte('created_at', new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString())

    const { data: pendingRequests, error: pendingError } = await supabase
      .from('memberships')
      .select('id', { count: 'exact' })
      .eq('club_id', clubId)
      .eq('status', 'pending')

    if (totalError || newError || pendingError) {
      throw new Error('Erreur lors de la récupération des statistiques')
    }

    return {
      total: totalMembers.length,
      new: newMembers.length,
      pending: pendingRequests.length
    }
  }
} 
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Search, MoreVertical, Mail, UserMinus, Shield, Loader2 } from 'lucide-react'
import { membersService, Member, MembershipRequest } from '@/services/members'

export default function ClubMembers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [members, setMembers] = useState<Member[]>([])
  const [pendingRequests, setPendingRequests] = useState<MembershipRequest[]>([])
  const [stats, setStats] = useState({ total: 0, new: 0, pending: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const { clubProfile } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (clubProfile?.id) {
      loadData()
    }
  }, [clubProfile?.id])

  const loadData = async () => {
    if (!clubProfile?.id) return
    
    setIsLoading(true)
    try {
      const [membersData, requestsData, statsData] = await Promise.all([
        membersService.getClubMembers(clubProfile.id),
        membersService.getPendingRequests(clubProfile.id),
        membersService.getMemberStats(clubProfile.id)
      ])

      setMembers(membersData)
      setPendingRequests(requestsData)
      setStats(statsData)
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les données',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInvite = async () => {
    if (!clubProfile?.id || !inviteEmail) return
    
    setIsProcessing(true)
    try {
      await membersService.inviteByEmail(clubProfile.id, inviteEmail)
      toast({
        title: 'Invitation envoyée',
        description: 'L\'utilisateur a été invité à rejoindre le club'
      })
      setShowInviteDialog(false)
      setInviteEmail('')
      loadData()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible d\'envoyer l\'invitation',
        variant: 'destructive'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUpdateRole = async (userId: string, newRole: 'admin' | 'member') => {
    if (!clubProfile?.id) return
    
    try {
      await membersService.updateMemberRole(clubProfile.id, userId, newRole)
      toast({
        title: 'Rôle mis à jour',
        description: 'Le rôle du membre a été modifié avec succès'
      })
      loadData()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier le rôle',
        variant: 'destructive'
      })
    }
  }

  const handleRemoveMember = async (userId: string) => {
    if (!clubProfile?.id) return
    
    try {
      await membersService.removeMember(clubProfile.id, userId)
      toast({
        title: 'Membre retiré',
        description: 'Le membre a été retiré du club'
      })
      loadData()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de retirer le membre',
        variant: 'destructive'
      })
    }
  }

  const handleRequest = async (requestId: string, accept: boolean) => {
    try {
      if (accept) {
        await membersService.acceptRequest(requestId)
      } else {
        await membersService.rejectRequest(requestId)
      }
      toast({
        title: accept ? 'Demande acceptée' : 'Demande refusée',
        description: accept ? 'Le membre a été ajouté au club' : 'La demande a été refusée'
      })
      loadData()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de traiter la demande',
        variant: 'destructive'
      })
    }
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold">Gestion des membres</h1>
          <p className="text-gray-600">
            Gérez les membres de {clubProfile?.name}
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total des membres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Nouveaux ce mois
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stats.new}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Demandes en attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <Tabs defaultValue="members" className="space-y-4">
          <TabsList>
            <TabsTrigger value="members">Membres</TabsTrigger>
            <TabsTrigger value="requests">Demandes d'inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Rechercher un membre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                <DialogTrigger asChild>
                  <Button>Inviter des membres</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Inviter un membre</DialogTitle>
                    <DialogDescription>
                      Entrez l'adresse email de la personne que vous souhaitez inviter
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                  <DialogFooter>
                    <Button
                      onClick={handleInvite}
                      disabled={isProcessing || !inviteEmail}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        'Envoyer l\'invitation'
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.joinedAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Envoyer un message
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleUpdateRole(member.id, member.role === 'admin' ? 'member' : 'admin')}>
                              <Shield className="mr-2 h-4 w-4" />
                              {member.role === 'admin' ? 'Rétrograder en membre' : 'Promouvoir admin'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onSelect={() => handleRemoveMember(member.id)}
                            >
                              <UserMinus className="mr-2 h-4 w-4" />
                              Retirer du club
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date de demande</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.user.name}</TableCell>
                      <TableCell>{request.user.email}</TableCell>
                      <TableCell>{request.createdAt}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRequest(request.id, false)}
                        >
                          Refuser
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleRequest(request.id, true)}
                        >
                          Accepter
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendingRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        Aucune demande d'inscription en attente
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
} 
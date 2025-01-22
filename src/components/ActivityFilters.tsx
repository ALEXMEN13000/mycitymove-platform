import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Star, ArrowUpDown, Crosshair, Filter } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ActivityFiltersProps {
  onFiltersChange: (filters: any) => Promise<void>
  onSortChange: (sort: string) => void
  onLocationUpdate: () => Promise<void>
}

export function ActivityFilters({ onFiltersChange, onSortChange, onLocationUpdate }: ActivityFiltersProps) {
  const [pendingFilters, setPendingFilters] = useState({
    club: 'all',
    district: 'all',
    age: 'all',
    level: 'all',
    time: 'all',
    dayOfWeek: 'all',
    distance: 'all'
  })

  const [sortOrder, setSortOrder] = useState('best')
  const [isLocating, setIsLocating] = useState(false)

  const districts = [
    "1er arrondissement", "2ème arrondissement", "3ème arrondissement",
    "4ème arrondissement", "5ème arrondissement", "6ème arrondissement",
    "7ème arrondissement", "8ème arrondissement", "9ème arrondissement",
    "10ème arrondissement", "11ème arrondissement", "12ème arrondissement",
    "13ème arrondissement", "14ème arrondissement", "15ème arrondissement",
    "16ème arrondissement"
  ]

  const ageRanges = [
    '6 ans et +',
    '7-77 ans',
    '14 ans et +',
    '16 ans et +'
  ]

  const levels = [
    'Débutant',
    'Tous niveaux'
  ]

  const timeSlots = [
    'Matin (6h-12h)',
    'Midi (12h-14h)',
    'Après-midi (14h-18h)',
    'Soir (18h-22h)'
  ]

  const daysOfWeek = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche'
  ]

  const distanceOptions = [
    { value: 'all', label: 'Toutes les distances' },
    { value: '1', label: 'Moins de 1 km' },
    { value: '2', label: 'Moins de 2 km' },
    { value: '5', label: 'Moins de 5 km' },
    { value: '10', label: 'Moins de 10 km' }
  ]

  const clubs = [
    { value: "Tennis Club Marseillais", label: "Tennis Club Marseillais" },
    { value: "École de Musique du Palais Carli", label: "École de Musique du Palais Carli" },
    { value: "Zen & Harmonie", label: "Zen & Harmonie" },
    { value: "La Scène des Arts", label: "La Scène des Arts" }
  ]

  const handleFilterChange = (key: string, value: any) => {
    setPendingFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = async () => {
    try {
      await onFiltersChange(pendingFilters);
      toast.success('Filtres appliqués');
    } catch (error) {
      console.error('Erreur lors de l\'application des filtres:', error);
      toast.error('Une erreur est survenue lors de l\'application des filtres');
    }
  };

  const handleSortClick = () => {
    const newOrder = sortOrder === 'best' ? 'worst' : 'best'
    setSortOrder(newOrder)
    onSortChange(newOrder)
  }

  const handleLocationClick = async () => {
    setIsLocating(true);
    try {
      await onLocationUpdate();
      toast.success('Localisation mise à jour');
      
      // Si une distance est déjà sélectionnée, appliquer les filtres immédiatement
      if (pendingFilters.distance !== 'all') {
        await onFiltersChange(pendingFilters);
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue lors de la mise à jour de la localisation');
      // Réinitialiser le filtre de distance en cas d'erreur
      setPendingFilters(prev => ({ ...prev, distance: 'all' }));
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtres</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSortClick}
          className="flex items-center gap-2"
        >
          <Star className="h-4 w-4" fill={sortOrder === 'best' ? 'currentColor' : 'none'} />
          {sortOrder === 'best' ? 'Mieux notés' : 'Moins bien notés'}
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="flex justify-between items-center">
            <span>Localisation</span>
            <Button
              variant="ghost"
              onClick={handleLocationClick}
              disabled={isLocating}
              className="h-8 px-2"
            >
              <Crosshair className="h-4 w-4 mr-1" />
              {isLocating ? 'Localisation...' : 'Autour de moi'}
            </Button>
          </Label>
          <Select
            value={pendingFilters.distance}
            onValueChange={(value) => handleFilterChange('distance', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir une distance" />
            </SelectTrigger>
            <SelectContent>
              {distanceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Club</Label>
          <Select
            value={pendingFilters.club}
            onValueChange={(value) => handleFilterChange('club', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un club" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les clubs</SelectItem>
              {clubs.map((club) => (
                <SelectItem key={club.value} value={club.value}>
                  {club.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Jour de la semaine</Label>
          <Select
            value={pendingFilters.dayOfWeek}
            onValueChange={(value) => handleFilterChange('dayOfWeek', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un jour" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les jours</SelectItem>
              {daysOfWeek.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Arrondissement</Label>
          <Select
            value={pendingFilters.district}
            onValueChange={(value) => handleFilterChange('district', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un arrondissement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les arrondissements</SelectItem>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Âge</Label>
          <Select
            value={pendingFilters.age}
            onValueChange={(value) => handleFilterChange('age', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir une tranche d'âge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les âges</SelectItem>
              {ageRanges.map((age) => (
                <SelectItem key={age} value={age}>
                  {age}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Niveau</Label>
          <Select
            value={pendingFilters.level}
            onValueChange={(value) => handleFilterChange('level', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les niveaux</SelectItem>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Horaire</Label>
          <Select
            value={pendingFilters.time}
            onValueChange={(value) => handleFilterChange('time', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un créneau horaire" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les horaires</SelectItem>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full"
          onClick={handleApplyFilters}
        >
          Appliquer les filtres
        </Button>
      </div>
    </div>
  )
} 
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NewActivity = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Nouvelle Activité</h1>

        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
          {/* Informations de base */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Informations de base</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'activité *
                  </label>
                  <Input required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sport">Sport</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="musique">Musique</SelectItem>
                      <SelectItem value="bien-etre">Bien-être</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description détaillée
                </label>
                <Textarea 
                  placeholder="Veuillez renseigner ce champ."
                  className="min-h-[120px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau requis *
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debutant">Débutant</SelectItem>
                      <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                      <SelectItem value="avance">Avancé</SelectItem>
                      <SelectItem value="tous">Tous niveaux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tarifs *
                  </label>
                  <div className="relative">
                    <Input 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      required 
                      className="pl-8"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Horaires *</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jour
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un jour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lundi">Lundi</SelectItem>
                    <SelectItem value="mardi">Mardi</SelectItem>
                    <SelectItem value="mercredi">Mercredi</SelectItem>
                    <SelectItem value="jeudi">Jeudi</SelectItem>
                    <SelectItem value="vendredi">Vendredi</SelectItem>
                    <SelectItem value="samedi">Samedi</SelectItem>
                    <SelectItem value="dimanche">Dimanche</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure début
                </label>
                <Input type="time" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure fin
                </label>
                <Input type="time" required />
              </div>
            </div>
          </div>

          {/* Médias et liens */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Médias et liens</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo / Logo *
                </label>
                <Input type="file" accept="image/*" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site web
                </label>
                <Input type="url" placeholder="https://" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Réseaux sociaux
                </label>
                <Input type="url" placeholder="https://" />
              </div>
            </div>
          </div>

          {/* Responsable */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Responsable</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du responsable *
                </label>
                <Input required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Informations du responsable *
                </label>
                <Input placeholder="Téléphone, email..." required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description du responsable
                </label>
                <Textarea className="min-h-[100px]" />
              </div>
            </div>
          </div>

          {/* Coach */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Coach</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du coach
                </label>
                <Input />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Informations du coach
                </label>
                <Input placeholder="Téléphone, email..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description du coach
                </label>
                <Textarea className="min-h-[100px]" />
              </div>
            </div>
          </div>

          {/* Conditions particulières */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Conditions particulières</h2>
            <Textarea 
              placeholder="Équipement requis, restrictions d'âge, etc."
              className="min-h-[100px]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              Annuler
            </Button>
            <Button type="submit">
              Créer l'activité
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewActivity; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ClubAuthForm = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="clubName">Nom du club</Label>
        <Input id="clubName" type="text" placeholder="Nom de votre club" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="contact@votreclub.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Décrivez votre club et ses activités..."
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" type="password" />
      </div>
      <Button className="w-full">Créer un compte club</Button>
    </div>
  );
};
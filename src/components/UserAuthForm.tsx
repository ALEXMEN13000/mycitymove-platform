import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const UserAuthForm = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="votre@email.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" type="password" />
      </div>
      <Button className="w-full">Se connecter</Button>
    </div>
  );
};
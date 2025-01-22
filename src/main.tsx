import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("Démarrage de l'application...");
const rootElement = document.getElementById("root");
console.log("Élément root trouvé:", rootElement);

if (!rootElement) {
  console.error("L'élément root n'a pas été trouvé!");
} else {
  console.log("Création du root React...");
  const root = createRoot(rootElement);
  console.log("Rendu de l'application...");
  root.render(<App />);
  console.log("Application rendue!");
}

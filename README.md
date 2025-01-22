# MyCityMove - Plateforme de découverte d'activités à Marseille

MyCityMove est une plateforme web moderne qui permet aux Marseillais de découvrir et de s'inscrire à des activités sportives et culturelles dans leur ville. Elle met en relation les clubs et associations avec les habitants, facilitant ainsi l'accès aux activités locales.

## Fonctionnalités

- 🔍 Recherche d'activités par quartier, type et niveau
- 📍 Géolocalisation pour trouver les activités à proximité
- 📅 Gestion de calendrier personnel
- ⭐ Système d'avis et de notation
- 👥 Espace club pour gérer les activités et les membres
- 📱 Interface responsive et moderne

## Technologies utilisées

- React 18 avec TypeScript
- Vite pour le bundling
- TailwindCSS pour le styling
- React Query pour la gestion des données
- React Router pour la navigation
- Supabase pour la base de données et l'authentification

## Installation

1. Clonez le repository :
\`\`\`bash
git clone [URL_DU_REPO]
cd mycitymove
\`\`\`

2. Installez les dépendances :
\`\`\`bash
npm install
\`\`\`

3. Créez un fichier .env à partir du .env.example :
\`\`\`bash
cp .env.example .env
\`\`\`

4. Lancez le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`

## Structure du projet

\`\`\`
src/
├── components/     # Composants réutilisables
├── pages/         # Pages de l'application
├── contexts/      # Contextes React
├── hooks/         # Hooks personnalisés
├── services/      # Services et API
├── styles/        # Styles globaux
└── utils/         # Utilitaires
\`\`\`

## Déploiement

Le projet est configuré pour être déployé sur Vercel. Chaque push sur la branche main déclenche automatiquement un déploiement.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT

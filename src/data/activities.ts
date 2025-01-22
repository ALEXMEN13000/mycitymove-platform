export const activities = [
  {
    title: "Cours de Tennis",
    category: "Sport",
    subcategory: "Tennis",
    location: "265 Avenue de Mazargues",
    district: "8ème arrondissement",
    coordinates: { lat: 43.2615, lng: 5.3961 }, // ~4.5km
    startTime: "10:00",
    endTime: "11:30",
    dayOfWeek: "Lundi",
    level: "Tous niveaux",
    ageRange: "7-77 ans",
    imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",
    clubName: "Tennis Club Marseillais",
    clubLogo: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.8,
    prices: {
      session: 25,
      month: 90,
      quarter: 250,
      year: 900
    },
    clubDescription: "Le Tennis Club Marseillais, fondé en 1985, est l'un des plus prestigieux clubs de tennis de la région PACA. Avec ses 8 courts en terre battue et 4 courts en dur, le club offre des installations de premier ordre pour la pratique du tennis en loisir ou en compétition.",
    coach: {
      name: "Thomas Dubois",
      experience: "15 ans",
      certifications: ["Diplôme d'État JEPS Tennis", "Certification FFT Expert"],
      description: "Ancien joueur professionnel et passionné par l'enseignement du tennis, Thomas adapte sa pédagogie à chaque élève pour une progression optimale. Il a formé de nombreux jeunes talents qui brillent aujourd'hui en compétition."
    },
    description: "Nos cours de tennis s'adressent à tous les niveaux, du débutant au joueur confirmé. La séance combine exercices techniques, tactiques et situations de jeu réel. Le matériel peut être prêté pour les débutants.",
    socialLinks: {
      website: "https://tennis-club-marseillais.fr",
      instagram: "https://instagram.com/tennisclubmarseillais",
      facebook: "https://facebook.com/tennisclubmarseillais",
      linkedin: "https://linkedin.com/company/tennis-club-marseillais",
      whatsapp: "https://wa.me/33491234567",
      phone: "04 91 23 45 67"
    },
    contact: {
      responsable: "Jean Dupont",
      email: "contact@tennis-club-marseillais.fr",
      phone: "06 12 34 56 78"
    }
  },
  {
    title: "Cours de Piano",
    category: "Musique",
    subcategory: "Piano",
    location: "1 Place Ernest Reyer",
    district: "1er arrondissement",
    coordinates: { lat: 43.2977, lng: 5.3836 },
    level: "Tous niveaux",
    startTime: "14:00",
    endTime: "15:30",
    dayOfWeek: "Mardi",
    imageUrl: "https://images.unsplash.com/photo-1552422535-c45813c61732",
    clubName: "École de Musique du Palais Carli",
    clubLogo: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.6,
    prices: {
      session: 35,
      month: 120,
      quarter: 330,
      year: 1200
    },
    clubDescription: "L'École de Musique du Palais Carli, située dans un bâtiment historique au cœur de Marseille, est une institution reconnue pour l'excellence de son enseignement musical. Nos salles sont équipées de pianos Yamaha de haute qualité.",
    coach: {
      name: "Claire Dubois",
      experience: "20 ans",
      certifications: ["Diplôme du Conservatoire National Supérieur de Paris", "Premier Prix de Piano"],
      description: "Pianiste concertiste et pédagogue passionnée, Claire enseigne avec patience et enthousiasme. Son approche pédagogique allie technique classique et répertoire varié, du baroque au contemporain."
    },
    description: "Apprenez le piano dans un cadre prestigieux avec des professeurs d'exception. Les cours sont personnalisés et adaptés à votre niveau, que vous soyez débutant ou avancé. Vous découvrirez un répertoire varié tout en développant votre technique et votre musicalité.",
    ageRange: "6 ans et +",
    socialLinks: {
      website: "https://palais-carli-musique.fr",
      instagram: "https://instagram.com/palaiscarlimusique",
      facebook: "https://facebook.com/ecolemusiquepalaiscarli",
      linkedin: "https://linkedin.com/company/ecole-musique-palais-carli",
      whatsapp: "https://wa.me/33491234568",
      phone: "04 91 23 45 68"
    },
    contact: {
      responsable: "Marie Lambert",
      email: "contact@palais-carli-musique.fr",
      phone: "06 23 45 67 89"
    }
  },
  {
    title: "Séance de Yoga",
    category: "Bien-être",
    subcategory: "Yoga",
    location: "45 Rue Fort Notre Dame",
    district: "7ème arrondissement",
    coordinates: { lat: 43.2934, lng: 5.3731 },
    level: "Tous niveaux",
    startTime: "09:00",
    endTime: "10:15",
    dayOfWeek: "Mercredi",
    imageUrl: "https://images.unsplash.com/photo-1599447421416-3414500d18a5",
    clubName: "Zen & Harmonie",
    clubLogo: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.9,
    prices: {
      session: 20,
      month: 75,
      quarter: 200,
      year: 720
    },
    ageRange: "16 ans et +",
    clubDescription: "Zen & Harmonie est un havre de paix au cœur de Marseille. Notre studio, baigné de lumière naturelle et équipé de tout le matériel nécessaire, offre un cadre idéal pour la pratique du yoga dans une atmosphère sereine et bienveillante.",
    coach: {
      name: "Sarah Martin",
      experience: "12 ans",
      certifications: ["Certification RYT-500", "Spécialisation Yoga Thérapeutique", "Formation Ashtanga Yoga"],
      description: "Sarah a découvert le yoga lors d'un voyage en Inde et en a fait sa passion. Elle enseigne avec douceur et précision, en accordant une attention particulière à l'alignement et à la respiration."
    },
    description: "Nos séances de yoga combinent postures traditionnelles (asanas), exercices de respiration (pranayama) et méditation. Chaque cours est conçu pour développer force, souplesse et équilibre, tout en apportant calme et sérénité.",
    socialLinks: {
      website: "https://zen-harmonie-marseille.fr",
      instagram: "https://instagram.com/zenharmoniemarseille",
      facebook: "https://facebook.com/zenharmoniemarseille",
      linkedin: "https://linkedin.com/company/zen-harmonie",
      whatsapp: "https://wa.me/33491234569",
      phone: "04 91 23 45 69"
    },
    contact: {
      responsable: "Sophie Martin",
      email: "contact@zen-harmonie-marseille.fr",
      phone: "06 34 56 78 90"
    }
  },
  {
    title: "Cours de Théâtre",
    category: "Art",
    subcategory: "Théâtre",
    location: "54 Rue de Rome",
    district: "6ème arrondissement",
    coordinates: { lat: 43.2944, lng: 5.3776 },
    level: "Débutant",
    startTime: "16:00",
    endTime: "17:30",
    dayOfWeek: "Jeudi",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf",
    clubName: "La Scène des Arts",
    clubLogo: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.7,
    prices: {
      session: 30,
      month: 110,
      quarter: 300,
      year: 1080
    },
    ageRange: "14 ans et +",
    clubDescription: "La Scène des Arts est un lieu emblématique du théâtre marseillais depuis plus de 30 ans. Notre salle intimiste de 100 places offre un cadre idéal pour l'apprentissage et la pratique du théâtre, avec une acoustique exceptionnelle et des équipements professionnels.",
    coach: {
      name: "Marc Laurent",
      experience: "25 ans",
      certifications: ["Diplôme du Conservatoire National d'Art Dramatique", "Certification en Direction d'Acteurs", "Prix d'Excellence en Art Dramatique"],
      description: "Marc est un comédien et metteur en scène passionné qui a joué sur les plus grandes scènes françaises. Son enseignement allie technique théâtrale classique et approche contemporaine pour développer la créativité et la confiance en soi de ses élèves."
    },
    description: "Découvrez l'art du théâtre dans un cadre bienveillant et professionnel. Le cours combine exercices de diction, travail corporel, improvisation et interprétation de textes classiques et contemporains. Idéal pour développer sa confiance en soi et sa créativité.",
    socialLinks: {
      website: "https://scene-des-arts.fr",
      instagram: "https://instagram.com/scenedesarts",
      facebook: "https://facebook.com/lascenedesarts",
      linkedin: "https://linkedin.com/company/la-scene-des-arts",
      whatsapp: "https://wa.me/33491234570",
      phone: "04 91 23 45 70"
    },
    contact: {
      responsable: "Pierre Durand",
      email: "contact@scene-des-arts.fr",
      phone: "06 45 67 89 01"
    }
  }
]; 
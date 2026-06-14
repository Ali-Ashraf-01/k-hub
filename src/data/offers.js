export const clubStats = [
  {
    value: '+120',
    label: { ar: 'حجز شهري', en: 'monthly bookings', fr: 'réservations mensuelles' },
  },
  {
    value: '7',
    label: { ar: 'أنشطة رياضية', en: 'sports activities', fr: 'activités sportives' },
  },
  {
    value: '4',
    label: { ar: 'طرق دفع', en: 'payment methods', fr: 'modes de paiement' },
  },
  {
    value: '3',
    label: { ar: 'لغات', en: 'languages', fr: 'langues' },
  },
];

export const offers = [
  {
    id: 'morning',
    badge: { ar: 'صباحي', en: 'Morning', fr: 'Matin' },
    title: { ar: 'باقة الصباح الهادئ', en: 'Calm Morning Package', fr: 'Pack matin calme' },
    description: {
      ar: 'خصم مناسب للحجوزات من 8 صباحًا حتى 12 ظهرًا.',
      en: 'A smart discount for bookings from 8 AM to 12 PM.',
      fr: 'Une remise adaptée aux réservations de 8h à 12h.',
    },
    price: { ar: 'خصم 15%', en: '15% off', fr: '-15%' },
    features: {
      ar: ['مناسب للتدريب', 'أقل زحمة', 'تأكيد سريع'],
      en: ['Great for training', 'Less crowded', 'Fast confirmation'],
      fr: ['Idéal pour l’entraînement', 'Moins fréquenté', 'Confirmation rapide'],
    },
  },
  {
    id: 'group',
    badge: { ar: 'جماعي', en: 'Group', fr: 'Groupe' },
    title: { ar: 'باقة المجموعات', en: 'Group Package', fr: 'Pack groupe' },
    description: {
      ar: 'مناسبة لحجوزات الكورة والباسكت والباد بول.',
      en: 'Best for football, basketball, and bad ball group bookings.',
      fr: 'Idéal pour les réservations de football, basket et bad ball.',
    },
    price: { ar: 'من 500 ج.م', en: 'From 500 EGP', fr: 'À partir de 500 EGP' },
    features: {
      ar: ['عدد لاعبين أكبر', 'ملاعب جماعية', 'مناسب للشركات'],
      en: ['More players', 'Team courts', 'Company friendly'],
      fr: ['Plus de joueurs', 'Terrains collectifs', 'Adapté aux entreprises'],
    },
  },
  {
    id: 'premium',
    badge: { ar: 'Premium', en: 'Premium', fr: 'Premium' },
    title: { ar: 'باقة البادل المميزة', en: 'Premium Padel Package', fr: 'Pack padel premium' },
    description: {
      ar: 'أفضل اختيار لحجز ملعب بادل مع تجهيزات أعلى.',
      en: 'Best choice for premium padel court bookings.',
      fr: 'Le meilleur choix pour les réservations de padel premium.',
    },
    price: { ar: '650 ج.م / ساعة', en: '650 EGP / hour', fr: '650 EGP / heure' },
    features: {
      ar: ['ملعب زجاجي', 'إضاءة ليلية', 'تجربة احترافية'],
      en: ['Glass court', 'Night lighting', 'Professional experience'],
      fr: ['Terrain vitré', 'Éclairage nocturne', 'Expérience professionnelle'],
    },
  },
];

export const sportHighlights = {
  Padel: {
    title: { ar: 'بادل', en: 'Padel', fr: 'Padel' },
    text: {
      ar: 'ملاعب زجاجية بتجربة احترافية، مناسبة للماتشات والتدريب.',
      en: 'Glass courts with a premium experience for matches and training.',
      fr: 'Terrains vitrés avec expérience premium pour matchs et entraînement.',
    },
  },
  Basketball: {
    title: { ar: 'باسكت', en: 'Basketball', fr: 'Basket-ball' },
    text: {
      ar: 'مساحة ممتازة للتدريب والماتشات السريعة مع الأصدقاء.',
      en: 'Great space for practice and quick matches with friends.',
      fr: 'Excellent espace pour l’entraînement et les matchs rapides entre amis.',
    },
  },
  Football: {
    title: { ar: 'كورة', en: 'Football', fr: 'Football' },
    text: {
      ar: 'نجيلة صناعي وإضاءة قوية للحجوزات الجماعية وماتشات الليل.',
      en: 'Artificial turf and strong lighting for group bookings and night matches.',
      fr: 'Gazon synthétique et éclairage puissant pour réservations de groupe et matchs nocturnes.',
    },
  },
  Volta: {
    title: { ar: 'فولتا', en: 'Volta', fr: 'Volta' },
    text: {
      ar: 'لعب سريع وحماسي في مساحة أصغر مناسبة للشباب.',
      en: 'Fast, energetic play in a compact youth-friendly space.',
      fr: 'Jeu rapide et dynamique dans un espace compact adapté aux jeunes.',
    },
  },
  'Bad Ball': {
    title: { ar: 'باد بول', en: 'Bad Ball', fr: 'Bad Ball' },
    text: {
      ar: 'تجربة مختلفة ومناسبة للأصدقاء والمجموعات.',
      en: 'A different experience, great for friends and groups.',
      fr: 'Une expérience différente, idéale pour amis et groupes.',
    },
  },
  Tennis: {
    title: { ar: 'تنس', en: 'Tennis', fr: 'Tennis' },
    text: {
      ar: 'مناسب للتدريب أو مباراة سريعة مع تجهيزات مريحة.',
      en: 'Suitable for training or a quick match with comfortable facilities.',
      fr: 'Adapté à l’entraînement ou à un match rapide avec des installations confortables.',
    },
  },
};

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'khub-language';
const LanguageContext = createContext(null);

const translations = {
  ar: {
    brandSubtitle: 'حجز ملاعب النادي',
    nav: {
      home: 'الرئيسية',
      courts: 'الملاعب',
      offers: 'العروض والأسعار',
      about: 'عن النادي',
      contact: 'تواصل معنا',
      myBookings: 'حجوزاتي',
      schedule: 'جدول المواعيد',
      login: 'تسجيل الدخول',
      register: 'تسجيل جديد',
      logout: 'خروج',
      language: 'اللغة',
    },
    common: {
      bookNow: 'احجز الآن',
      viewDetails: 'عرض التفاصيل',
      changeCourt: 'تغيير الملعب',
      available: 'متاح',
      booked: 'محجوز',
      selected: 'مختار',
      cash: 'ج.م',
      required: 'يرجى استكمال الحقول المطلوبة.',
      save: 'حفظ',
      cancel: 'إلغاء',
      loginToBook: 'سجل الدخول للحجز',
      backHome: 'رجوع للرئيسية',
      noData: 'لا توجد بيانات',
    },
    home: {
      eyebrow: 'K-HUB Sports Club',
      title: 'موقع حجز متكامل لنادي K-HUB',
      desc: 'احجز البادل أو الباسكت أو الكورة أو الفولتا أو الباد بول أو التنس، وشوف المواعيد المتاحة، وادفع بالطريقة المناسبة ليك.',
      startBooking: 'ابدأ الحجز',
      viewSchedule: 'شوف جدول اليوم',
      paymentEyebrow: 'طرق الدفع',
      paymentTitle: 'اختار طريقة الدفع المناسبة',
      paymentDesc: 'تقدر تدفع عند الوصول، أو من خلال InstaPay أو Vodafone Cash أو PayPal، والتحويلات الإلكترونية بتحتاج رفع إثبات دفع للمراجعة.',
      featuredTitle: 'ملاعب مميزة',
      featuredEyebrow: 'الأكثر طلبًا',
      stepsTitle1: 'سجل بياناتك',
      stepsText1: 'الاسم، الإيميل، ورقم الموبايل، وبعدها نكمل بيانات الحجز.',
      stepsTitle2: 'اختار الملعب',
      stepsText2: 'شوف صور الملعب ومميزاته وسعته قبل الحجز.',
      stepsTitle3: 'حدد الموعد والدفع',
      stepsText3: 'اختار التاريخ، الوقت، وعدد اللاعبين وطريقة الدفع.',
      ctaEyebrow: 'Ready?',
      ctaTitle: 'ابدأ تجربة الحجز دلوقتي',
      ctaDesc: 'احجز ملعبك، اختار طريقة الدفع، وتابع حالة الحجز من حسابك.',
      chooseCourt: 'اختار ملعب',
    },
    courts: {
      eyebrow: 'K-HUB Courts',
      title: 'اختار الملعب اللي عايز تحجزه',
      desc: 'فلتر حسب نوع اللعبة، وشوف تفاصيل كل ملعب وصوره ومميزاته قبل الحجز.',
      visible: 'ملعب ظاهر الآن',
      searchPlaceholder: 'ابحث عن ملعب أو لعبة...',
      emptyTitle: 'مفيش ملاعب بالبحث ده',
      emptyText: 'جرّب تغير نوع اللعبة أو كلمة البحث.',
      all: 'الكل',
    },
    details: {
      backToCourts: 'رجوع للملاعب',
      gallery: 'صور الملعب',
      features: 'مميزات الملعب',
      moreInfo: 'تفاصيل أكثر',
      surface: 'نوع الأرضية',
      duration: 'المدة',
      capacity: 'السعة',
      price: 'السعر',
      location: 'الموقع',
      openHours: 'مواعيد التشغيل',
    },
    booking: {
      title: 'حدد التاريخ والوقت والبيانات',
      subtitle: 'أكمل تفاصيل الحجز واختر طريقة الدفع المناسبة.',
      progress1: '1. الملعب',
      progress2: '2. البيانات والموعد',
      progress3: '3. التأكيد',
      date: 'التاريخ',
      bookedToday: 'المواعيد المحجوزة لهذا اليوم',
      noBooked: 'لا توجد مواعيد محجوزة في هذا اليوم.',
      summary: 'ملخص الحجز',
      customer: 'العميل',
      time: 'الوقت',
      courtDetails: 'تفاصيل الملعب',
      customerInfo: 'بيانات العميل',
      fullName: 'الاسم الكامل',
      phone: 'رقم الموبايل',
      email: 'الإيميل',
      players: 'عدد اللاعبين',
      notes: 'ملاحظات إضافية',
      notesPlaceholder: 'مثال: عندي معدات خاصة / محتاج كرات إضافية...',
      paymentTitle: 'اختار طريقة الدفع',
      paymentHint: 'اختر وسيلة الدفع التي تفضّلها قبل تأكيد الحجز.',
      confirm: 'تأكيد الحجز',
      chooseTimeFirst: 'اختار ميعاد الأول.',
      slotBooked: 'الميعاد ده اتحجز بالفعل، اختار ميعاد تاني.',
      choosePayment: 'اختار طريقة الدفع.',
      chooseCourt: 'اختر ملعبًا أولاً',
      unavailableCourt: 'الملعب غير موجود',
      selectedMethod: 'طريقة الدفع',
    },
    login: {
      eyebrow: 'تسجيل المستخدم',
      title: 'سجّل وابدأ حجز ملعبك',
      desc: 'سجّل بياناتك مرة واحدة، وبعدها تقدر تدخل بالإيميل والباسورد وتتابع حجوزاتك بسهولة.',
      benefits1: 'حفظ بيانات الحجز',
      benefits2: 'عرض حجوزاتي',
      benefits3: 'منع حجز نفس الموعد مرتين',
      formTitle: 'بيانات الدخول',
      formText: 'اكتب بيانات بسيطة عشان تكمل الحجز.',
      name: 'الاسم',
      email: 'الإيميل',
      phone: 'رقم الموبايل',
      submit: 'دخول للحجز',
      namePlaceholder: 'مثال: محمد أحمد',
      emailPlaceholder: 'example@email.com',
      phonePlaceholder: '01012345678',
      error: 'كمّل الاسم والإيميل ورقم الموبايل.',
    },
    myBookings: {
      eyebrow: 'حجوزاتي',
      title: 'كل المواعيد اللي حجزتها',
      emptyTitle: 'لسه مفيش حجوزات',
      emptyText: 'اختار ملعب وحدد الميعاد المناسب.',
      newBooking: 'حجز جديد',
      bookNow: 'احجز دلوقتي',
      confirmed: 'مؤكد',
      payment: 'الدفع',
      cancel: 'إلغاء الحجز',
    },
    schedule: {
      eyebrow: 'جدول النادي',
      title: 'المواعيد المحجوزة والمتاحة',
      desc: 'صفحة مبدئية للإدارة أو الريسبشن لمتابعة حجوزات اليوم.',
      reservations: 'حجز',
      date: 'التاريخ',
      court: 'الملعب',
      allCourts: 'كل الملاعب',
      noBookingsTitle: 'لا توجد حجوزات',
      noBookingsText: 'اليوم ده فاضي حسب الفلتر المختار.',
      customer: 'العميل',
      payment: 'الدفع',
    },
  },
  en: {
    brandSubtitle: 'Sports Club Booking',
    nav: {
      home: 'Home', courts: 'Courts', offers: 'Offers', about: 'About', contact: 'Contact', myBookings: 'My Bookings', schedule: 'Schedule', login: 'Login', register: 'Register', logout: 'Logout', language: 'Language',
    },
    common: { bookNow: 'Book now', viewDetails: 'View details', changeCourt: 'Change court', available: 'Available', booked: 'Booked', selected: 'Selected', cash: 'EGP', required: 'Please fill all required fields.', save: 'Save', cancel: 'Cancel', loginToBook: 'Login to book', backHome: 'Back to home', noData: 'No data' },
    home: {
      eyebrow: 'K-HUB Sports Club', title: 'A complete booking website for K-HUB Club', desc: 'Book padel, basketball, football, volta, bad ball, or tennis, see available slots, and pay with your preferred method.', startBooking: 'Start booking', viewSchedule: 'Today schedule', paymentEyebrow: 'Payment methods', paymentTitle: 'Choose your preferred payment method', paymentDesc: 'You can pay on arrival or through InstaPay, Vodafone Cash, or PayPal. Online transfers require uploading payment proof for review.', featuredTitle: 'Featured courts', featuredEyebrow: 'Most requested', stepsTitle1: 'Register your data', stepsText1: 'Add your name, email, and phone, then continue your booking details.', stepsTitle2: 'Choose the court', stepsText2: 'See court photos, capacity, and features before booking.', stepsTitle3: 'Choose time & payment', stepsText3: 'Select the date, time, player count, and payment method.', ctaEyebrow: 'Ready?', ctaTitle: 'Start your booking experience now', ctaDesc: 'Book your court, choose the payment method, and track booking status from your account.', chooseCourt: 'Choose a court'
    },
    courts: { eyebrow: 'K-HUB Courts', title: 'Choose the court you want to book', desc: 'Filter by sport, then view each court photos and details before booking.', visible: 'visible courts now', searchPlaceholder: 'Search a court or sport...', emptyTitle: 'No courts match your search', emptyText: 'Try changing the sport or search term.', all: 'All' },
    details: { backToCourts: 'Back to courts', gallery: 'Court gallery', features: 'Court features', moreInfo: 'More details', surface: 'Surface', duration: 'Duration', capacity: 'Capacity', price: 'Price', location: 'Location', openHours: 'Open hours' },
    booking: { title: 'Choose the date, time, and customer details', subtitle: 'Complete your booking details and select the right payment method.', progress1: '1. Court', progress2: '2. Details & time', progress3: '3. Confirmation', date: 'Date', bookedToday: 'Booked slots for this day', noBooked: 'No booked slots for this day.', summary: 'Booking summary', customer: 'Customer', time: 'Time', courtDetails: 'Court details', customerInfo: 'Customer details', fullName: 'Full name', phone: 'Phone number', email: 'Email', players: 'Players count', notes: 'Additional notes', notesPlaceholder: 'Example: I have my own equipment / need extra balls...', paymentTitle: 'Choose payment method', paymentHint: 'Pick your preferred payment method before confirming.', confirm: 'Confirm booking', chooseTimeFirst: 'Choose a time first.', slotBooked: 'This slot is already booked. Choose another one.', choosePayment: 'Choose a payment method.', chooseCourt: 'Choose a court first', unavailableCourt: 'Court not found', selectedMethod: 'Payment method' },
    login: { eyebrow: 'User registration', title: 'Register and start booking your court', desc: 'Register once, then log in with your email and password to follow your bookings.', benefits1: 'Save booking data', benefits2: 'View my bookings', benefits3: 'Prevent double booking', formTitle: 'Login details', formText: 'Enter basic data to continue booking.', name: 'Name', email: 'Email', phone: 'Phone number', submit: 'Login to booking', namePlaceholder: 'Example: Mohamed Ahmed', emailPlaceholder: 'example@email.com', phonePlaceholder: '01012345678', error: 'Please complete name, email, and phone.' },
    myBookings: { eyebrow: 'My bookings', title: 'All the time slots you booked', emptyTitle: 'No bookings yet', emptyText: 'Choose a court and select the right slot.', newBooking: 'New booking', bookNow: 'Book now', confirmed: 'Confirmed', payment: 'Payment', cancel: 'Cancel booking' },
    schedule: { eyebrow: 'Club schedule', title: 'Booked and available slots', desc: 'A starter page for admin or reception to monitor daily bookings.', reservations: 'bookings', date: 'Date', court: 'Court', allCourts: 'All courts', noBookingsTitle: 'No bookings', noBookingsText: 'This day is empty based on the selected filter.', customer: 'Customer', payment: 'Payment' },
  },
  fr: {
    brandSubtitle: 'Réservation des terrains',
    nav: { home: 'Accueil', courts: 'Terrains', offers: 'Offres', about: 'À propos', contact: 'Contact', myBookings: 'Mes réservations', schedule: 'Planning', login: 'Connexion', register: 'Inscription', logout: 'Déconnexion', language: 'Langue' },
    common: { bookNow: 'Réserver', viewDetails: 'Voir détails', changeCourt: 'Changer de terrain', available: 'Disponible', booked: 'Réservé', selected: 'Sélectionné', cash: 'EGP', required: 'Veuillez remplir tous les champs obligatoires.', save: 'Enregistrer', cancel: 'Annuler', loginToBook: 'Connectez-vous pour réserver', backHome: 'Retour à l’accueil', noData: 'Aucune donnée' },
    home: { eyebrow: 'K-HUB Sports Club', title: 'Un site complet de réservation pour K-HUB Club', desc: 'Réservez le padel, le basket, le football, le volta, le bad ball ou le tennis, voyez les créneaux disponibles et payez avec la méthode souhaitée.', startBooking: 'Commencer la réservation', viewSchedule: 'Voir le planning du jour', paymentEyebrow: 'Modes de paiement', paymentTitle: 'Choisissez votre mode de paiement', paymentDesc: 'Vous pouvez payer à l’arrivée, ou via InstaPay, Vodafone Cash ou PayPal. Les virements en ligne nécessitent une preuve de paiement.', featuredTitle: 'Terrains en vedette', featuredEyebrow: 'Les plus demandés', stepsTitle1: 'Enregistrez vos données', stepsText1: 'Ajoutez votre nom, votre e-mail et votre téléphone, puis complétez la réservation.', stepsTitle2: 'Choisissez le terrain', stepsText2: 'Consultez les photos, la capacité et les avantages avant de réserver.', stepsTitle3: 'Choisissez l’heure et le paiement', stepsText3: 'Sélectionnez la date, l’heure, le nombre de joueurs et le mode de paiement.', ctaEyebrow: 'Prêt ?', ctaTitle: 'Commencez votre réservation maintenant', ctaDesc: 'Réservez votre terrain, choisissez le paiement et suivez l’état de la réservation depuis votre compte.', chooseCourt: 'Choisir un terrain' },
    courts: { eyebrow: 'Terrains K-HUB', title: 'Choisissez le terrain que vous voulez réserver', desc: 'Filtrez par sport, puis consultez les photos et détails de chaque terrain avant de réserver.', visible: 'terrains visibles', searchPlaceholder: 'Rechercher un terrain ou un sport...', emptyTitle: 'Aucun terrain ne correspond à votre recherche', emptyText: 'Essayez de changer le sport ou le mot-clé.', all: 'Tous' },
    details: { backToCourts: 'Retour aux terrains', gallery: 'Galerie du terrain', features: 'Caractéristiques', moreInfo: 'Plus de détails', surface: 'Surface', duration: 'Durée', capacity: 'Capacité', price: 'Prix', location: 'Emplacement', openHours: 'Heures d’ouverture' },
    booking: { title: 'Choisissez la date, l’heure et les informations client', subtitle: 'Complétez les détails de la réservation et sélectionnez le bon mode de paiement.', progress1: '1. Terrain', progress2: '2. Détails et horaire', progress3: '3. Confirmation', date: 'Date', bookedToday: 'Créneaux réservés pour ce jour', noBooked: 'Aucun créneau réservé pour ce jour.', summary: 'Résumé de la réservation', customer: 'Client', time: 'Heure', courtDetails: 'Détails du terrain', customerInfo: 'Informations client', fullName: 'Nom complet', phone: 'Téléphone', email: 'E-mail', players: 'Nombre de joueurs', notes: 'Notes supplémentaires', notesPlaceholder: 'Exemple : J’ai mon propre équipement / j’ai besoin de balles supplémentaires...', paymentTitle: 'Choisissez le mode de paiement', paymentHint: 'Choisissez votre mode de paiement préféré avant de confirmer.', confirm: 'Confirmer la réservation', chooseTimeFirst: 'Choisissez d’abord une heure.', slotBooked: 'Ce créneau est déjà réservé. Choisissez-en un autre.', choosePayment: 'Choisissez un mode de paiement.', chooseCourt: 'Choisissez d’abord un terrain', unavailableCourt: 'Terrain introuvable', selectedMethod: 'Mode de paiement' },
    login: { eyebrow: 'Inscription utilisateur', title: 'Inscrivez-vous et commencez à réserver votre terrain', desc: 'Inscrivez-vous une seule fois, puis connectez-vous avec votre e-mail et mot de passe pour suivre vos réservations.', benefits1: 'Sauvegarder les réservations', benefits2: 'Voir mes réservations', benefits3: 'Empêcher la double réservation', formTitle: 'Informations de connexion', formText: 'Saisissez des données simples pour continuer.', name: 'Nom', email: 'E-mail', phone: 'Téléphone', submit: 'Se connecter pour réserver', namePlaceholder: 'Exemple : Mohamed Ahmed', emailPlaceholder: 'example@email.com', phonePlaceholder: '01012345678', error: 'Veuillez compléter le nom, l’e-mail et le téléphone.' },
    myBookings: { eyebrow: 'Mes réservations', title: 'Tous les créneaux que vous avez réservés', emptyTitle: 'Aucune réservation pour le moment', emptyText: 'Choisissez un terrain et sélectionnez le bon créneau.', newBooking: 'Nouvelle réservation', bookNow: 'Réserver maintenant', confirmed: 'Confirmé', payment: 'Paiement', cancel: 'Annuler la réservation' },
    schedule: { eyebrow: 'Planning du club', title: 'Créneaux réservés et disponibles', desc: 'Une page de départ pour l’administration ou la réception afin de suivre les réservations du jour.', reservations: 'réservations', date: 'Date', court: 'Terrain', allCourts: 'Tous les terrains', noBookingsTitle: 'Aucune réservation', noBookingsText: 'Cette journée est vide selon le filtre choisi.', customer: 'Client', payment: 'Paiement' },
  },
};

function resolvePath(object, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], object);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem(STORAGE_KEY) || 'ar');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    isArabic: language === 'ar',
    t(path) {
      return resolvePath(translations[language], path) ?? resolvePath(translations.ar, path) ?? path;
    },
    pick(value) {
      if (!value || typeof value === 'string') return value;
      return value[language] ?? value.ar ?? value.en ?? Object.values(value)[0];
    },
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}

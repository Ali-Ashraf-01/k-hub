import { Link } from 'react-router-dom';
import { clubStats } from '../data/offers.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const pageText = {
  ar: {
    eyebrow: 'عن النادي',
    title: 'K-HUB مش مجرد ملاعب، دي تجربة حجز ولعب كاملة',
    desc: 'بنجهز موقع يساعد العميل يشوف الملاعب، يختار الوقت المناسب، يعرف تفاصيل كل ملعب، ويحدد طريقة الدفع قبل الوصول.',
    storyTitle: 'هدف الموقع',
    story: 'الهدف إن العميل ما يحتاجش يتصل أو يسأل عن المواعيد. كل ملعب ليه صفحة تفاصيل، صور، سعر، سعة، ومواعيد متاحة ومحجوزة.',
    visionTitle: 'رؤيتنا',
    vision: 'تحويل تجربة حجز الملاعب من ورق واتصالات إلى تجربة رقمية واضحة وسريعة واحترافية للعميل والإدارة.',
    valuesTitle: 'مميزات التجربة',
    values: ['اختيار اللغة', 'طرق دفع متعددة', 'تفاصيل كاملة لكل ملعب', 'جدول مواعيد واضح', 'مراجعة الدفع من الإدارة'],
    action: 'ابدأ الحجز',
  },
  en: {
    eyebrow: 'About us',
    title: 'K-HUB is not just courts, it is a complete booking experience',
    desc: 'We are building a website where customers can view courts, choose a time, see details, and select payment before arrival.',
    storyTitle: 'Project goal',
    story: 'The goal is to remove phone calls and manual checks. Each court has details, photos, price, capacity, and available or booked slots.',
    visionTitle: 'Our vision',
    vision: 'Move court booking from paper and calls into a clear, fast, professional digital experience for customers and club management.',
    valuesTitle: 'Experience features',
    values: ['Language selection', 'Multiple payment methods', 'Complete court details', 'Clear schedule', 'Admin payment review'],
    action: 'Start booking',
  },
  fr: {
    eyebrow: 'À propos',
    title: 'K-HUB n’est pas seulement des terrains, c’est une expérience complète',
    desc: 'Nous créons un site où les clients peuvent voir les terrains, choisir un horaire, consulter les détails et sélectionner le paiement avant l’arrivée.',
    storyTitle: 'Objectif du projet',
    story: 'L’objectif est d’éviter les appels et les vérifications manuelles. Chaque terrain a ses détails, photos, prix, capacité et créneaux disponibles ou réservés.',
    visionTitle: 'Notre vision',
    vision: 'Transformer la réservation des terrains en une expérience numérique claire, rapide et professionnelle pour les clients et la gestion du club.',
    valuesTitle: 'Fonctionnalités',
    values: ['Choix de langue', 'Modes de paiement multiples', 'Détails complets', 'Planning clair', 'Validation admin du paiement'],
    action: 'Commencer',
  },
};

export default function AboutPage() {
  const { language, pick } = useLanguage();
  const text = pageText[language] || pageText.ar;

  return (
    <div className="page section">
      <section className="info-hero about-hero">
        <div>
          <p className="eyebrow">{text.eyebrow}</p>
          <h1>{text.title}</h1>
          <p>{text.desc}</p>
          <Link className="btn btn-primary" to="/courts">{text.action}</Link>
        </div>
        <div className="about-visual">
          <span>🎾</span>
          <span>🏀</span>
          <span>⚽</span>
          <span>🏐</span>
        </div>
      </section>

      <section className="stats-row section compact-section">
        {clubStats.map((stat) => (
          <div key={stat.value}>
            <strong>{stat.value}</strong>
            <span>{pick(stat.label)}</span>
          </div>
        ))}
      </section>

      <section className="two-column-section">
        <article className="premium-card text-card">
          <p className="eyebrow">{text.storyTitle}</p>
          <h2>{text.storyTitle}</h2>
          <p>{text.story}</p>
        </article>
        <article className="premium-card text-card dark-text-card">
          <p className="eyebrow">{text.visionTitle}</p>
          <h2>{text.visionTitle}</h2>
          <p>{text.vision}</p>
        </article>
      </section>

      <section className="section compact-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{text.valuesTitle}</p>
            <h2>{text.valuesTitle}</h2>
          </div>
        </div>
        <div className="values-grid">
          {text.values.map((value, index) => (
            <div className="value-card" key={value}>
              <span>{index + 1}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

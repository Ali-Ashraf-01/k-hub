import { Link } from 'react-router-dom';
import { courts, paymentMethods } from '../data/courts.js';
import { sportHighlights } from '../data/offers.js';
import CourtCard from '../components/CourtCard.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function HomePage() {
  const { t, pick } = useLanguage();
  const featuredCourts = courts.slice(0, 3);
  const sports = courts.map((court) => ({ id: court.id, icon: court.icon, type: pick(court.typeLabel) }));
  const sportCards = [...new Map(courts.map((court) => [court.type, court])).values()];

  return (
    <div className="page">
      <section className="hero hero-v2">
        <div className="hero-content hero-glass">
          <p className="eyebrow">{t('home.eyebrow')}</p>
          <h1>{t('home.title')}</h1>
          <p>{t('home.desc')}</p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to="/courts">{t('home.startBooking')}</Link>
            <Link className="btn btn-outline" to="/schedule">{t('home.viewSchedule')}</Link>
          </div>

          <div className="hero-sports-strip" aria-label="Available sports">
            {sports.map((sport) => (
              <span key={sport.id}>{sport.icon} {sport.type}</span>
            ))}
          </div>
        </div>

        <div className="hero-visual-card">
          <div className="live-badge"><span /> Live booking</div>
          <div className="booking-preview">
            <div className="preview-top">
              <div>
                <small>{t('booking.time')}</small>
                <strong>08:00 PM</strong>
              </div>
              <span>🎾</span>
            </div>
            <h3>{pick(courts[0].name)}</h3>
            <div className="preview-timeline">
              <span className="done">18:00</span>
              <span className="active">19:00</span>
              <span>20:00</span>
              <span>21:00</span>
            </div>
            <div className="preview-user">
              <div className="avatar-stack">
                <i>م</i>
                <i>أ</i>
                <i>ك</i>
              </div>
              <p>3 حجوزات مؤكدة اليوم</p>
            </div>
          </div>

          <div className="floating-stat one">
            <strong>7</strong>
            <span>ملاعب</span>
          </div>
          <div className="floating-stat two">
            <strong>4</strong>
            <span>طرق دفع</span>
          </div>
        </div>
      </section>

      <section className="stats-row section compact-section">
        <div>
          <strong>+120</strong>
          <span>حجز شهري</span>
        </div>
        <div>
          <strong>7</strong>
          <span>ألعاب رياضية</span>
        </div>
        <div>
          <strong>08:00 - 23:00</strong>
          <span>مواعيد العمل</span>
        </div>
        <div>
          <strong>3</strong>
          <span>لغات</span>
        </div>
      </section>


      <section className="section compact-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Sports</p>
            <h2>{t('nav.courts')}</h2>
          </div>
        </div>

        <div className="sports-showcase-grid">
          {sportCards.map((court) => (
            <Link
              key={court.type}
              className="sport-showcase-card"
              to={`/sports/${encodeURIComponent(court.type)}`}
              style={{ '--accent': court.accent }}
            >
              <span>{court.icon}</span>
              <strong>{pick(court.typeLabel)}</strong>
              <p>{pick(sportHighlights[court.type]?.text)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section compact-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t('home.paymentEyebrow')}</p>
            <h2>{t('home.paymentTitle')}</h2>
            <p>{t('home.paymentDesc')}</p>
          </div>
        </div>

        <div className="payment-grid">
          {paymentMethods.map((method) => (
            <article className="payment-card" key={method.id} style={{ '--payment-accent': method.accent }}>
              <div className="payment-badge">{method.short}</div>
              <div>
                <h3>{pick(method.name)}</h3>
                <p>{pick(method.description)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t('home.featuredEyebrow')}</p>
            <h2>{t('home.featuredTitle')}</h2>
          </div>
          <Link to="/courts" className="link-btn">
            {t('nav.courts')} ←
          </Link>
        </div>

        <div className="cards-grid">
          {featuredCourts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>
      </section>

      <section className="steps section compact-section">
        <div className="step-card">
          <span>1</span>
          <h3>{t('home.stepsTitle1')}</h3>
          <p>{t('home.stepsText1')}</p>
        </div>
        <div className="step-card featured-step">
          <span>2</span>
          <h3>{t('home.stepsTitle2')}</h3>
          <p>{t('home.stepsText2')}</p>
        </div>
        <div className="step-card">
          <span>3</span>
          <h3>{t('home.stepsTitle3')}</h3>
          <p>{t('home.stepsText3')}</p>
        </div>
      </section>

      <section className="cta-section section compact-section">
        <div>
          <p className="eyebrow">{t('home.ctaEyebrow')}</p>
          <h2>{t('home.ctaTitle')}</h2>
          <p>{t('home.ctaDesc')}</p>
        </div>
        <Link className="btn btn-primary" to="/courts">{t('home.chooseCourt')}</Link>
      </section>
    </div>
  );
}

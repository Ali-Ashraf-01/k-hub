import { Link, useParams } from 'react-router-dom';
import CourtCard from '../components/CourtCard.jsx';
import { courts } from '../data/courts.js';
import { sportHighlights } from '../data/offers.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function SportPage() {
  const { sportType } = useParams();
  const decodedType = decodeURIComponent(sportType || '');
  const { t, pick } = useLanguage();

  const sportCourts = courts.filter((court) => court.type === decodedType);
  const sport = sportHighlights[decodedType];

  if (!sport || sportCourts.length === 0) {
    return (
      <div className="page section">
        <div className="empty-state">
          <h1>{t('common.noData')}</h1>
          <Link className="btn btn-primary" to="/courts">{t('details.backToCourts')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page section">
      <section className="sport-hero premium-card" style={{ '--accent': sportCourts[0].accent }}>
        <div>
          <p className="eyebrow">{pick(sport.title)}</p>
          <h1>{pick(sport.title)}</h1>
          <p>{pick(sport.text)}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to={`/book/${sportCourts[0].id}`}>{t('common.bookNow')}</Link>
            <Link className="btn btn-light" to="/courts">{t('details.backToCourts')}</Link>
          </div>
        </div>
        <div className="sport-hero-stack">
          {sportCourts.map((court) => (
            <img key={court.id} src={court.image} alt={pick(court.name)} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t('nav.courts')}</p>
            <h2>{pick(sport.title)}</h2>
          </div>
        </div>
        <div className="cards-grid">
          {sportCourts.map((court) => <CourtCard key={court.id} court={court} />)}
        </div>
      </section>
    </div>
  );
}

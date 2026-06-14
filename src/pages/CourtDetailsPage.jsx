import { Link, useParams } from 'react-router-dom';
import { courts } from '../data/courts.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function CourtDetailsPage() {
  const { courtId } = useParams();
  const { t, pick } = useLanguage();
  const court = courts.find((item) => item.id === courtId);

  if (!court) {
    return (
      <div className="page section">
        <div className="empty-state">
          <h1>{t('booking.unavailableCourt')}</h1>
          <Link className="btn btn-primary" to="/courts">{t('details.backToCourts')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page section details-page">
      <div className="details-hero premium-card" style={{ '--accent': court.accent }}>
        <div className="details-image-col">
          <img src={court.gallery[0]} alt={pick(court.name)} className="details-main-image" />
          <div className="details-gallery-row">
            {court.gallery.map((image, index) => (
              <img key={`${court.id}-${index}`} src={image} alt={`${pick(court.name)} ${index + 1}`} className="details-thumb" />
            ))}
          </div>
        </div>

        <div className="details-content-col">
          <p className="eyebrow">{pick(court.typeLabel)}</p>
          <h1>{pick(court.name)}</h1>
          <p>{pick(court.longDescription) || pick(court.description)}</p>

          <div className="court-meta-grid details-meta-grid">
            <div>
              <small>{t('details.price')}</small>
              <strong>{court.price} {t('common.cash')}</strong>
            </div>
            <div>
              <small>{t('details.duration')}</small>
              <strong>{court.duration} min</strong>
            </div>
            <div>
              <small>{t('details.capacity')}</small>
              <strong>{pick(court.capacity)}</strong>
            </div>
            <div>
              <small>{t('details.surface')}</small>
              <strong>{pick(court.surface)}</strong>
            </div>
            <div>
              <small>{t('details.location')}</small>
              <strong>{pick(court.location)}</strong>
            </div>
            <div>
              <small>{t('details.openHours')}</small>
              <strong>{court.openHours}</strong>
            </div>
          </div>

          <div className="details-section">
            <h3>{t('details.features')}</h3>
            <ul className="feature-list details-feature-list">
              {pick(court.features)?.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>

          <div className="details-actions">
            <Link to="/courts" className="btn btn-light">{t('details.backToCourts')}</Link>
            <Link to={`/book/${court.id}`} className="btn btn-primary">{t('common.bookNow')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

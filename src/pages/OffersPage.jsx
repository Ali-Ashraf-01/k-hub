import { Link } from 'react-router-dom';
import { courts, paymentMethods } from '../data/courts.js';
import { offers } from '../data/offers.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const pageText = {
  ar: { eyebrow: 'العروض والأسعار', title: 'اختار العرض أو راجع سعر كل ملعب', desc: 'راجع أسعار الملاعب والعروض المتاحة، واختار الأنسب ليك قبل الحجز.', courtsTitle: 'أسعار الملاعب', paymentsTitle: 'طرق الدفع المتاحة', action: 'احجز الآن' },
  en: { eyebrow: 'Offers & Prices', title: 'Choose an offer or review each court price', desc: 'Review court prices and available offers, then choose what suits your booking.', courtsTitle: 'Court prices', paymentsTitle: 'Available payment methods', action: 'Book now' },
  fr: { eyebrow: 'Offres et prix', title: 'Choisissez une offre ou consultez le prix de chaque terrain', desc: 'Consultez les prix et les offres disponibles, puis choisissez ce qui convient à votre réservation.', courtsTitle: 'Prix des terrains', paymentsTitle: 'Modes de paiement', action: 'Réserver' },
};

export default function OffersPage() {
  const { language, t, pick } = useLanguage();
  const text = pageText[language] || pageText.ar;

  return (
    <div className="page section">
      <section className="info-hero">
        <div>
          <p className="eyebrow">{text.eyebrow}</p>
          <h1>{text.title}</h1>
          <p>{text.desc}</p>
        </div>
        <Link className="btn btn-primary" to="/courts">{text.action}</Link>
      </section>

      <section className="offers-grid section compact-section">
        {offers.map((offer) => (
          <article className="offer-card premium-card" key={offer.id}>
            <span className="offer-badge">{pick(offer.badge)}</span>
            <h2>{pick(offer.title)}</h2>
            <p>{pick(offer.description)}</p>
            <strong className="offer-price">{pick(offer.price)}</strong>
            <ul className="feature-list">
              {pick(offer.features).map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section className="section compact-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{text.courtsTitle}</p>
            <h2>{text.courtsTitle}</h2>
          </div>
        </div>

        <div className="price-table-wrap">
          <table className="price-table">
            <thead>
              <tr>
                <th>{t('schedule.court')}</th>
                <th>{t('details.duration')}</th>
                <th>{t('details.capacity')}</th>
                <th>{t('details.price')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courts.map((court) => (
                <tr key={court.id}>
                  <td><span className="table-icon">{court.icon}</span>{pick(court.name)}</td>
                  <td>{court.duration} min</td>
                  <td>{pick(court.capacity)}</td>
                  <td>{court.price} {t('common.cash')}</td>
                  <td><Link className="link-btn" to={`/book/${court.id}`}>{text.action}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section compact-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{text.paymentsTitle}</p>
            <h2>{text.paymentsTitle}</h2>
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
    </div>
  );
}

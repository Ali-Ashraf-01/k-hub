import { Link } from 'react-router-dom';
import { courts, paymentMethods } from '../data/courts.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Footer() {
  const { t, pick } = useLanguage();
  const sportTypes = [...new Set(courts.map((court) => court.type))];

  return (
    <footer className="site-footer">
      <div className="footer-inner page">
        <div className="footer-brand">
          <Link to="/" className="brand footer-logo">
            <img src="/k-hub-logo.png" alt="K-HUB logo" className="brand-logo-img footer-logo-img" />
            <span>
              <strong>K-HUB</strong>
              <small>{t('brandSubtitle')}</small>
            </span>
          </Link>
          <p>
            نادي رياضي لحجز ملاعب البادل، الكورة، الباسكت، الفولتا، الباد بول، والتنس
            بطريقة سريعة ومنظمة.
          </p>
          <div className="footer-socials">
            <span>IG</span>
            <span>FB</span>
            <span>WA</span>
          </div>
        </div>

        <div className="footer-col">
          <h3>{t('nav.courts')}</h3>
          {sportTypes.map((type) => (
            <Link key={type} to={`/sports/${encodeURIComponent(type)}`}>
              {type}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h3>Links</h3>
          <Link to="/offers">{t('nav.offers')}</Link>
          <Link to="/about">{t('nav.about')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
          {t('nav.schedule') && <Link to="/schedule">{t('nav.schedule')}</Link>}
        </div>

        <div className="footer-col">
          <h3>{t('home.paymentTitle')}</h3>
          {paymentMethods.map((method) => (
            <span key={method.id}>{pick(method.name)}</span>
          ))}
        </div>
      </div>

      <div className="footer-bottom page">
        <span>© 2026 K-HUB. All rights reserved.</span>
        <span>Sports club booking experience.</span>
      </div>
    </footer>
  );
}

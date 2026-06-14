import { useEffect, useMemo, useState } from 'react';
import CourtCard from '../components/CourtCard.jsx';
import { courts, getSportTypes } from '../data/courts.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function CourtsPage() {
  const { language, t, pick } = useLanguage();
  const [activeType, setActiveType] = useState(t('courts.all'));
  const [searchTerm, setSearchTerm] = useState('');

  const sportTypes = useMemo(() => getSportTypes(language, t), [language, t]);

  useEffect(() => {
    setActiveType(t('courts.all'));
  }, [language, t]);

  const filteredCourts = useMemo(() => {
    return courts.filter((court) => {
      const currentType = pick(court.typeLabel);
      const matchesType = activeType === t('courts.all') || currentType === activeType;
      const search = searchTerm.trim().toLowerCase();
      const pool = [pick(court.name), currentType, pick(court.description)].join(' ').toLowerCase();
      const matchesSearch = !search || pool.includes(search);
      return matchesType && matchesSearch;
    });
  }, [activeType, searchTerm, pick, t]);

  return (
    <div className="page section">
      <div className="courts-hero">
        <div>
          <p className="eyebrow">{t('courts.eyebrow')}</p>
          <h1>{t('courts.title')}</h1>
          <p>{t('courts.desc')}</p>
        </div>
        <div className="courts-hero-card">
          <strong>{filteredCourts.length}</strong>
          <span>{t('courts.visible')}</span>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <span>🔎</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={t('courts.searchPlaceholder')}
          />
        </div>

        <div className="sport-tabs">
          {sportTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={activeType === type ? 'active' : ''}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {filteredCourts.length === 0 ? (
        <div className="empty-state">
          <h2>{t('courts.emptyTitle')}</h2>
          <p>{t('courts.emptyText')}</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filteredCourts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>
      )}
    </div>
  );
}

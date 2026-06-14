import { useMemo, useState } from 'react';
import { useBookings } from '../context/BookingContext.jsx';
import { courts } from '../data/courts.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { formatArabicDate, toLocalDateInputValue } from '../utils/bookingUtils.js';

function getStatusInfo(status) {
  if (status === 'pending') return { className: 'warning', label: 'قيد المراجعة' };
  if (status === 'rejected') return { className: 'danger-chip', label: 'مرفوض' };
  if (status === 'cancelled') return { className: 'muted-chip', label: 'ملغي' };
  return { className: 'success', label: 'مؤكد' };
}

export default function AdminSchedulePage() {
  const { bookings, approveBooking, rejectBooking } = useBookings();
  const { t, pick } = useLanguage();
  const [date, setDate] = useState(toLocalDateInputValue());
  const [courtId, setCourtId] = useState('all');

  const filteredBookings = useMemo(() => {
    return bookings
      .filter((booking) => booking.date === date)
      .filter((booking) => courtId === 'all' || booking.courtId === courtId)
      .sort((a, b) => (a.startTime || a.time || '').localeCompare(b.startTime || b.time || ''));
  }, [bookings, courtId, date]);

  const confirmedRevenue = filteredBookings
    .filter((booking) => booking.status === 'confirmed')
    .reduce((total, booking) => total + booking.price, 0);

  const pendingCount = filteredBookings.filter((booking) => booking.status === 'pending').length;

  return (
    <div className="page section">
      <div className="courts-hero schedule-hero">
        <div>
          <p className="eyebrow">لوحة الإدارة</p>
          <h1>الحجوزات ومراجعة الدفع</h1>
          <p>تابع الحجوزات، راجع صور إثبات الدفع، وأكد أو ارفض الحجز.</p>
        </div>
        <div className="schedule-stats">
          <div>
            <strong>{filteredBookings.length}</strong>
            <span>{t('schedule.reservations')}</span>
          </div>
          <div>
            <strong>{pendingCount}</strong>
            <span>قيد المراجعة</span>
          </div>
          <div>
            <strong>{confirmedRevenue}</strong>
            <span>{t('common.cash')}</span>
          </div>
        </div>
      </div>

      <div className="filters">
        <label>
          {t('schedule.date')}
          <input
            type="date"
            value={date}
            min={toLocalDateInputValue()}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <label>
          {t('schedule.court')}
          <select value={courtId} onChange={(event) => setCourtId(event.target.value)}>
            <option value="all">{t('schedule.allCourts')}</option>
            {courts.map((court) => (
              <option key={court.id} value={court.id}>{pick(court.name)}</option>
            ))}
          </select>
        </label>
      </div>

      <h2 className="date-title">{formatArabicDate(date)}</h2>

      {filteredBookings.length === 0 ? (
        <div className="empty-state">
          <h2>{t('schedule.noBookingsTitle')}</h2>
          <p>{t('schedule.noBookingsText')}</p>
        </div>
      ) : (
        <div className="booking-list schedule-list">
          {filteredBookings.map((booking) => {
            const status = getStatusInfo(booking.status);
            return (
              <article className="booking-item booking-item-rich admin-booking-item" key={booking.id}>
                <div>
                  <span className={`chip ${status.className}`}>{status.label}</span>
                  <h3>{booking.courtName}</h3>
                  <p>{t('booking.time')}: {booking.time}</p>
                  <p>{t('schedule.customer')}: {booking.userName} - {booking.userPhone}</p>
                  <p>{t('schedule.payment')}: {booking.paymentMethodLabel || '--'}</p>
                  {booking.paymentReceiver && <p>بيانات التحويل: {booking.paymentReceiver}</p>}
                  {booking.paymentReference && <p>رقم العملية: {booking.paymentReference}</p>}
                  {booking.transferName && <p>اسم صاحب التحويل: {booking.transferName}</p>}
                  {booking.adminNote && <p className="admin-note-text">{booking.adminNote}</p>}
                </div>

                <div className="admin-proof-side">
                  <strong className="price-block">{booking.price} {t('common.cash')}</strong>
                  {booking.paymentProof ? (
                    <a href={booking.paymentProof} target="_blank" rel="noreferrer" className="proof-image-link">
                      <img src={booking.paymentProof} alt="إثبات الدفع" />
                      <span>فتح صورة الدفع</span>
                    </a>
                  ) : (
                    <span className="no-proof-box">لا يوجد إثبات دفع</span>
                  )}

                  {booking.status === 'pending' && (
                    <div className="admin-review-actions">
                      <button className="btn btn-primary" onClick={() => approveBooking(booking.id)}>تأكيد الحجز</button>
                      <button className="btn btn-danger" onClick={() => rejectBooking(booking.id)}>رفض</button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

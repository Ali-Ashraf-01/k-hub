import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useBookings } from '../context/BookingContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { formatArabicDate } from '../utils/bookingUtils.js';

function getStatusInfo(status) {
  if (status === 'pending') {
    return { className: 'warning', label: 'قيد مراجعة الدفع' };
  }
  if (status === 'rejected') {
    return { className: 'danger-chip', label: 'مرفوض' };
  }
  if (status === 'cancelled') {
    return { className: 'muted-chip', label: 'ملغي' };
  }
  return { className: 'success', label: 'مؤكد' };
}

export default function MyBookingsPage() {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBookings();
  const { t } = useLanguage();

  const myBookings = bookings
    .filter((booking) => booking.userId === user.id)
    .sort((a, b) => `${a.date}T${a.startTime || a.time}`.localeCompare(`${b.date}T${b.startTime || b.time}`));

  return (
    <div className="page section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t('myBookings.eyebrow')}</p>
          <h1>{t('myBookings.title')}</h1>
        </div>
        <Link className="btn btn-primary" to="/courts">
          {t('myBookings.newBooking')}
        </Link>
      </div>

      {myBookings.length === 0 ? (
        <div className="empty-state">
          <h2>{t('myBookings.emptyTitle')}</h2>
          <p>{t('myBookings.emptyText')}</p>
          <Link className="btn btn-primary" to="/courts">
            {t('myBookings.bookNow')}
          </Link>
        </div>
      ) : (
        <div className="booking-list">
          {myBookings.map((booking) => {
            const status = getStatusInfo(booking.status);
            const canCancel = booking.status !== 'cancelled' && booking.status !== 'rejected';

            return (
              <article className="booking-item booking-item-rich" key={booking.id}>
                <div>
                  <span className={`chip ${status.className}`}>{status.label}</span>
                  <h3>{booking.courtName}</h3>
                  <p>{formatArabicDate(booking.date)} - {t('booking.time')} {booking.time}</p>
                  <p>{t('details.price')}: {booking.price} {t('common.cash')}</p>
                  <p>{t('myBookings.payment')}: {booking.paymentMethodLabel || '--'}</p>
                  {booking.paymentReference && <p>رقم العملية: {booking.paymentReference}</p>}
                  {booking.adminNote && <p className="admin-note-text">{booking.adminNote}</p>}
                  {booking.paymentProof && (
                    <div className="mini-proof-row">
                      <img src={booking.paymentProof} alt="إثبات الدفع" />
                      <span>إثبات الدفع مرفوع للإدارة</span>
                    </div>
                  )}
                </div>
                {canCancel && (
                  <button className="btn btn-danger" onClick={() => cancelBooking(booking.id)}>
                    {t('myBookings.cancel')}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

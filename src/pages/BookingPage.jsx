import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TimeSlotPicker from '../components/TimeSlotPicker.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useBookings } from '../context/BookingContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { courts, paymentMethods } from '../data/courts.js';
import { formatArabicDate, formatTimeRange, isPastRange, isValidBookingRange, toLocalDateInputValue } from '../utils/bookingUtils.js';

export default function BookingPage() {
  const { courtId } = useParams();
  const court = courts.find((item) => item.id === courtId);
  const { user } = useAuth();
  const { addBooking, isTimeRangeBooked, getBookedRanges } = useBookings();
  const { t, pick } = useLanguage();
  const navigate = useNavigate();

  const [date, setDate] = useState(toLocalDateInputValue());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    playersCount: '',
    notes: '',
    paymentMethod: '',
    transferName: '',
    paymentReference: '',
    paymentProof: '',
    paymentProofName: '',
  });

  const selectedPayment = paymentMethods.find((method) => method.id === details.paymentMethod);
  const requiresProof = Boolean(selectedPayment?.requiresProof);

  const bookedRanges = useMemo(
    () => (court ? getBookedRanges(court.id, date) : []),
    [court, date, getBookedRanges]
  );

  if (!court) {
    return (
      <div className="page section">
        <div className="empty-state">
          <h1>{t('booking.unavailableCourt')}</h1>
          <Link className="btn btn-primary" to="/courts">
            {t('details.backToCourts')}
          </Link>
        </div>
      </div>
    );
  }

  function handleProofUpload(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setMessage('ارفع صورة فقط لإثبات الدفع.');
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      setMessage('حجم الصورة كبير. اختار صورة أقل من 2.5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDetails((current) => ({
        ...current,
        paymentProof: reader.result,
        paymentProofName: file.name,
      }));
      setMessage('');
    };
    reader.readAsDataURL(file);
  }

  function handleBook() {
    if (!startTime || !endTime) {
      setMessage('اختار وقت البداية ووقت النهاية.');
      return;
    }

    if (!isValidBookingRange(startTime, endTime)) {
      setMessage('وقت النهاية لازم يكون بعد وقت البداية وداخل مواعيد العمل من 6 مساءً إلى 4 الفجر.');
      return;
    }

    if (isPastRange(date, startTime)) {
      setMessage('وقت البداية اللي اخترته انتهى، اختار وقت لاحق.');
      return;
    }

    if (!details.fullName || !details.phone || !details.email || !details.playersCount) {
      setMessage(t('common.required'));
      return;
    }

    if (!details.paymentMethod) {
      setMessage(t('booking.choosePayment'));
      return;
    }

    if (requiresProof && !details.paymentReference.trim()) {
      setMessage('اكتب رقم العملية أو ملاحظة التحويل.');
      return;
    }

    if (requiresProof && !details.paymentProof) {
      setMessage('ارفع اسكرين شوت إثبات الدفع عشان الإدارة تراجع الحجز.');
      return;
    }

    if (isTimeRangeBooked(court.id, date, startTime, endTime)) {
      setMessage('المدة دي فيها حجز بالفعل، اختار وقت تاني.');
      return;
    }

    addBooking({
      courtId: court.id,
      courtName: pick(court.name),
      userId: user.id,
      userName: details.fullName,
      userPhone: details.phone,
      userEmail: details.email,
      date,
      startTime,
      endTime,
      time: formatTimeRange(startTime, endTime),
      price: court.price,
      playersCount: details.playersCount,
      notes: details.notes,
      paymentMethod: details.paymentMethod,
      paymentMethodLabel: pick(selectedPayment?.name),
      paymentReceiver: selectedPayment?.receiverValue || '',
      transferName: details.transferName,
      paymentReference: details.paymentReference,
      paymentProof: details.paymentProof,
      paymentProofName: details.paymentProofName,
      status: requiresProof ? 'pending' : 'confirmed',
    });

    navigate('/my-bookings');
  }

  return (
    <div className="page section booking-layout-v2 booking-layout-updated">
      <aside className="booking-summary premium-card" style={{ '--accent': court.accent }}>
        <div className="booking-image-wrap">
          <img src={court.image} alt={pick(court.name)} />
          <span className="court-badge">{court.icon} {pick(court.typeLabel)}</span>
        </div>

        <div className="booking-summary-body">
          <p className="eyebrow">{t('booking.courtDetails')}</p>
          <h1>{pick(court.name)}</h1>
          <p>{pick(court.description)}</p>

          <div className="court-meta-grid booking-meta">
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
          </div>

          <div className="summary-box selected-summary">
            <h3>{t('booking.summary')}</h3>
            <p><span>{t('booking.date')}</span><strong>{formatArabicDate(date)}</strong></p>
            <p><span>{t('booking.time')}</span><strong>{startTime && endTime ? formatTimeRange(startTime, endTime) : '--'}</strong></p>
            <p><span>{t('booking.customer')}</span><strong>{details.fullName || user.name}</strong></p>
            <p><span>{t('booking.selectedMethod')}</span><strong>{selectedPayment ? pick(selectedPayment.name) : '--'}</strong></p>
            <p><span>حالة الحجز</span><strong>{requiresProof ? 'قيد مراجعة الدفع' : 'تأكيد مباشر'}</strong></p>
          </div>
        </div>
      </aside>

      <section className="booking-panel booking-panel-v2">
        <div className="booking-header">
          <div>
            <p className="eyebrow">K-HUB Booking</p>
            <h2>{t('booking.title')}</h2>
            <p>اختار الملعب والوقت وطريقة الدفع، وبعدها أكد الحجز بسهولة.</p>
          </div>
          <Link className="link-btn" to="/courts">{t('common.changeCourt')}</Link>
        </div>

        <div className="booking-progress">
          <span className="done">{t('booking.progress1')}</span>
          <span className="active">{t('booking.progress2')}</span>
          <span>{t('booking.progress3')}</span>
        </div>

        <div className="form-grid booking-form-grid">
          <label>
            {t('booking.fullName')}
            <input
              type="text"
              value={details.fullName}
              onChange={(event) => setDetails({ ...details, fullName: event.target.value })}
            />
          </label>

          <label>
            {t('booking.phone')}
            <input
              type="tel"
              value={details.phone}
              onChange={(event) => setDetails({ ...details, phone: event.target.value })}
            />
          </label>

          <label>
            {t('booking.email')}
            <input
              type="email"
              value={details.email}
              onChange={(event) => setDetails({ ...details, email: event.target.value })}
            />
          </label>

          <label>
            {t('booking.players')}
            <input
              type="number"
              min="1"
              value={details.playersCount}
              onChange={(event) => setDetails({ ...details, playersCount: event.target.value })}
            />
          </label>
        </div>

        <label className="date-label">
          {t('booking.date')}
          <input
            type="date"
            value={date}
            min={toLocalDateInputValue()}
            onChange={(event) => {
              setDate(event.target.value);
              setStartTime('');
              setEndTime('');
              setMessage('');
            }}
          />
        </label>

        <div className="status-row booking-hours-row">
          <span><i className="dot available-dot" /> مواعيد الحجز من 6:00 مساءً إلى 4:00 الفجر</span>
          <span><i className="dot booked-dot" /> أي مدة متداخلة مع حجز سابق لن يتم قبولها</span>
        </div>

        <TimeSlotPicker
          date={date}
          startTime={startTime}
          endTime={endTime}
          onChangeStart={(time) => {
            setStartTime(time);
            setMessage('');
          }}
          onChangeEnd={(time) => {
            setEndTime(time);
            setMessage('');
          }}
          isRangeBooked={(rangeStart, rangeEnd) => isTimeRangeBooked(court.id, date, rangeStart, rangeEnd)}
        />

        <div className="booked-list">
          <h3>{t('booking.bookedToday')}</h3>
          {bookedRanges.length > 0 ? (
            <div className="chips">
              {bookedRanges.map((range) => (
                <span key={range.id} className="chip booked">{range.label}</span>
              ))}
            </div>
          ) : (
            <p>{t('booking.noBooked')}</p>
          )}
        </div>

        <div className="details-section">
          <h3>{t('booking.paymentTitle')}</h3>
          <p className="muted-paragraph">اختر وسيلة الدفع. التحويلات الإلكترونية تحتاج إثبات دفع وسيتم مراجعتها من الإدارة.</p>
          <div className="payment-grid payment-grid-compact">
            {paymentMethods.map((method) => {
              const active = details.paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  className={`payment-card payment-card-button ${active ? 'active' : ''}`}
                  style={{ '--payment-accent': method.accent }}
                  onClick={() => {
                    setDetails({
                      ...details,
                      paymentMethod: method.id,
                      transferName: '',
                      paymentReference: '',
                      paymentProof: '',
                      paymentProofName: '',
                    });
                    setMessage('');
                  }}
                >
                  <div className="payment-badge">{method.short}</div>
                  <div>
                    <h3>{pick(method.name)}</h3>
                    <p>{pick(method.description)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedPayment && (
          <section className="payment-details-box" style={{ '--payment-accent': selectedPayment.accent }}>
            <div className="payment-details-head">
              <div className="payment-badge">{selectedPayment.short}</div>
              <div>
                <p className="eyebrow">تفاصيل الدفع</p>
                <h3>{pick(selectedPayment.name)}</h3>
                <p>{pick(selectedPayment.instructions)}</p>
              </div>
            </div>

            {selectedPayment.receiverValue && (
              <div className="receiver-box">
                <span>{selectedPayment.receiverLabel}</span>
                <strong>{selectedPayment.receiverValue}</strong>
              </div>
            )}

            {requiresProof ? (
              <div className="form-grid booking-form-grid proof-form">
                <label>
                  اسم صاحب التحويل
                  <input
                    type="text"
                    value={details.transferName}
                    onChange={(event) => setDetails({ ...details, transferName: event.target.value })}
                    placeholder="اكتب الاسم الظاهر في التحويل"
                  />
                </label>

                <label>
                  رقم العملية / ملاحظة التحويل
                  <input
                    type="text"
                    value={details.paymentReference}
                    onChange={(event) => setDetails({ ...details, paymentReference: event.target.value })}
                    placeholder="مثال: Transaction ID أو آخر 4 أرقام"
                  />
                </label>

                <label className="file-upload-label">
                  اسكرين شوت إثبات الدفع
                  <input type="file" accept="image/*" onChange={handleProofUpload} />
                </label>

                <div className="proof-preview-card">
                  {details.paymentProof ? (
                    <>
                      <img src={details.paymentProof} alt="إثبات الدفع" />
                      <span>{details.paymentProofName}</span>
                    </>
                  ) : (
                    <p>الصورة هتظهر هنا بعد الرفع، وهتوصل لصفحة الإدارة للمراجعة.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="cash-note">
                <strong>تأكيد مباشر</strong>
                <p>الحجز هيتأكد مباشرة، والدفع يتم عند الوصول للنادي.</p>
              </div>
            )}
          </section>
        )}

        <label>
          {t('booking.notes')}
          <textarea
            rows="4"
            value={details.notes}
            onChange={(event) => setDetails({ ...details, notes: event.target.value })}
            placeholder={t('booking.notesPlaceholder')}
          />
        </label>

        {message && <p className="error-text">⚠ {message}</p>}

        <button className="btn btn-primary full-width confirm-btn" onClick={handleBook}>
          {requiresProof ? 'إرسال الحجز للمراجعة' : t('booking.confirm')} {startTime && endTime ? `- ${formatTimeRange(startTime, endTime)}` : ''}
        </button>
      </section>
    </div>
  );
}

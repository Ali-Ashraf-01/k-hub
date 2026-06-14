import {
  formatTimeLabel,
  generateBookingTimeOptions,
  isPastRange,
  isValidBookingRange,
  toBookingMinutes,
} from '../utils/bookingUtils.js';

const timeOptions = generateBookingTimeOptions();

export default function TimeSlotPicker({
  date,
  startTime,
  endTime,
  onChangeStart,
  onChangeEnd,
  isRangeBooked,
}) {
  const startMinutes = toBookingMinutes(startTime);
  const endOptions = timeOptions.filter((option) => {
    if (!startTime || startMinutes === null) {
      return option.minutes > 18 * 60;
    }
    return option.minutes > startMinutes;
  });

  const hasValidRange = isValidBookingRange(startTime, endTime);
  const rangeIsPast = startTime ? isPastRange(date, startTime) : false;
  const rangeIsBooked = hasValidRange ? isRangeBooked(startTime, endTime) : false;

  let statusText = 'اختار وقت البداية والنهاية من مواعيد العمل.';
  let statusClass = 'info';

  if (startTime && endTime && !hasValidRange) {
    statusText = 'وقت النهاية لازم يكون بعد وقت البداية وداخل مواعيد العمل.';
    statusClass = 'danger';
  } else if (rangeIsPast) {
    statusText = 'الوقت اللي اخترته انتهى، اختار وقت لاحق.';
    statusClass = 'danger';
  } else if (rangeIsBooked) {
    statusText = 'المدة دي فيها حجز بالفعل، اختار مدة تانية.';
    statusClass = 'danger';
  } else if (hasValidRange) {
    statusText = `اختيارك: من ${formatTimeLabel(startTime)} إلى ${formatTimeLabel(endTime)}.`;
    statusClass = 'success';
  }

  return (
    <section className="time-range-card">
      <div className="time-range-head">
        <div>
          <p className="eyebrow">اختيار وقت الحجز</p>
          <h3>اكتب المدة اللي عايز تحجزها</h3>
          <p>مواعيد الحجز المتاحة من 6:00 مساءً لحد 4:00 الفجر.</p>
        </div>
        <span className="time-range-badge">6 PM → 4 AM</span>
      </div>

      <div className="time-range-fields">
        <label>
          من الساعة
          <select
            value={startTime}
            onChange={(event) => {
              onChangeStart(event.target.value);
              onChangeEnd('');
            }}
          >
            <option value="">اختار بداية الحجز</option>
            {timeOptions.slice(0, -1).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          إلى الساعة
          <select
            value={endTime}
            disabled={!startTime}
            onChange={(event) => onChangeEnd(event.target.value)}
          >
            <option value="">اختار نهاية الحجز</option>
            {endOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className={`time-range-status ${statusClass}`}>{statusText}</p>
    </section>
  );
}

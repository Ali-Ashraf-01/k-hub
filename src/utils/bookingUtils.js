export function toLocalDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export const BOOKING_START_HOUR = 18;
export const BOOKING_END_HOUR_NEXT_DAY = 4;
export const BOOKING_END_MINUTES = (24 + BOOKING_END_HOUR_NEXT_DAY) * 60;

export const BOOKING_SLOT_STEP_MINUTES = 60;
export const MIN_BOOKING_DURATION_MINUTES = 60;
export const MAX_BOOKING_DURATION_MINUTES = 120;
export function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toLocalDateInputValue(tomorrow);
}

export function formatArabicDate(dateValue) {
  if (!dateValue) return '';

  return new Intl.DateTimeFormat('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${dateValue}T12:00:00`));
}

export function toBookingMinutes(timeValue) {
  if (!timeValue) return null;
  const [hourText, minuteText] = timeValue.split(':');
  let hour = Number(hourText);
  const minutes = Number(minuteText || 0);

  if (Number.isNaN(hour) || Number.isNaN(minutes)) {
    return null;
  }

  if (hour < BOOKING_START_HOUR) {
    hour += 24;
  }

  return hour * 60 + minutes;
}

export function generateBookingTimeOptions() {
  const options = [];

  for (
  let minutes = BOOKING_START_HOUR * 60;
  minutes <= BOOKING_END_MINUTES;
  minutes += BOOKING_SLOT_STEP_MINUTES
)  {
    const normalizedHour = Math.floor(minutes / 60);
    const hour = normalizedHour % 24;
    const minute = minutes % 60;
    const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    options.push({
      value,
      label: formatTimeLabel(value),
      minutes,
    });
  }

  return options;
}

// kept for older components if needed
export function generateTimeSlots() {
  return generateBookingTimeOptions().map((option) => option.value);
}

export function formatTimeLabel(timeValue) {
  if (!timeValue) return '';
  const [hourText, minuteText] = timeValue.split(':');
  const hour = Number(hourText);
  const minute = Number(minuteText || 0);
  const suffix = hour >= 12 ? 'مساءً' : 'صباحًا';
  const twelveHour = hour % 12 || 12;
  return `${String(twelveHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${suffix}`;
}

export function formatTimeRange(startTime, endTime) {
  if (!startTime || !endTime) return '';
  return `${formatTimeLabel(startTime)} - ${formatTimeLabel(endTime)}`;
}

export function isValidBookingRange(startTime, endTime) {
  const start = toBookingMinutes(startTime);
  const end = toBookingMinutes(endTime);

  if (start === null || end === null) return false;
  if (start < BOOKING_START_HOUR * 60) return false;
  if (end > BOOKING_END_MINUTES) return false;

  const duration = end - start;

  if (duration < MIN_BOOKING_DURATION_MINUTES) return false;
  if (duration > MAX_BOOKING_DURATION_MINUTES) return false;

  return true;
}


export function isPastRange(dateValue, startTime) {
  if (!dateValue || !startTime) return false;

  const now = new Date();
  const selectedStart = toBookingMinutes(startTime);
  if (selectedStart === null) return false;

  const slotDate = new Date(`${dateValue}T12:00:00`);
  const realHour = selectedStart >= 24 * 60 ? Math.floor(selectedStart / 60) - 24 : Math.floor(selectedStart / 60);
  const realMinute = selectedStart % 60;

  if (selectedStart >= 24 * 60) {
    slotDate.setDate(slotDate.getDate() + 1);
  }

  slotDate.setHours(realHour, realMinute, 0, 0);
  return slotDate < now;
}

export function isPastSlot(dateValue, timeValue) {
  return isPastRange(dateValue, timeValue);
}

export function rangesOverlap(startA, endA, startB, endB) {
  const aStart = toBookingMinutes(startA);
  const aEnd = toBookingMinutes(endA);
  const bStart = toBookingMinutes(startB);
  const bEnd = toBookingMinutes(endB);

  if ([aStart, aEnd, bStart, bEnd].some((value) => value === null)) return false;

  return aStart < bEnd && bStart < aEnd;
}
export function generateBookingEndTimeOptions(startTime) {
  const start = toBookingMinutes(startTime);

  if (start === null) return [];

  return generateBookingTimeOptions().filter((option) => {
    const duration = option.minutes - start;

    return duration === 60 || duration === 120;
  });
}

export function addMinutesToTime(timeValue, minutesToAdd = 60) {
  const start = toBookingMinutes(timeValue);
  if (start === null) return '';

  const total = start + minutesToAdd;
  const hour = Math.floor(total / 60) % 24;
  const minute = total % 60;

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

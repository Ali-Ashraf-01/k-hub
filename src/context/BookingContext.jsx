import { createContext, useContext, useMemo, useState } from 'react';
import {
  addMinutesToTime,
  formatTimeRange,
  rangesOverlap,
  toLocalDateInputValue,
} from '../utils/bookingUtils.js';

const BookingContext = createContext(null);
const STORAGE_KEY = 'khub-bookings';

const defaultBookings = [];

function normalizeBooking(booking) {
  const startTime = booking.startTime || booking.time;
  const endTime = booking.endTime || addMinutesToTime(startTime, 60);
  const displayTime = booking.time?.includes(' - ')
    ? booking.time
    : formatTimeRange(startTime, endTime);

  return {
    ...booking,
    startTime,
    endTime,
    time: displayTime,
  };
}

function readSavedBookings() {
  try {
    const savedBookings = localStorage.getItem(STORAGE_KEY);
    return savedBookings ? JSON.parse(savedBookings).map(normalizeBooking) : defaultBookings;
  } catch {
    return defaultBookings;
  }
}

function isActiveBooking(booking) {
  return booking.status !== 'cancelled' && booking.status !== 'rejected';
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(readSavedBookings);

  function save(nextBookings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBookings));
    setBookings(nextBookings);
  }

  function addBooking(booking) {
    const nextBooking = normalizeBooking({
      id: crypto.randomUUID(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      adminNote: '',
      ...booking,
    });

    save([...bookings, nextBooking]);
    return nextBooking;
  }

  function cancelBooking(bookingId) {
    const nextBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    );
    save(nextBookings);
  }

  function approveBooking(bookingId) {
    const nextBookings = bookings.map((booking) =>
      booking.id === bookingId
        ? { ...booking, status: 'confirmed', reviewedAt: new Date().toISOString(), adminNote: 'تم تأكيد الدفع من الإدارة.' }
        : booking
    );
    save(nextBookings);
  }

  function rejectBooking(bookingId) {
    const nextBookings = bookings.map((booking) =>
      booking.id === bookingId
        ? { ...booking, status: 'rejected', reviewedAt: new Date().toISOString(), adminNote: 'تم رفض إثبات الدفع. برجاء التواصل مع الإدارة.' }
        : booking
    );
    save(nextBookings);
  }

  function getBookedRanges(courtId, date) {
    return bookings
      .map(normalizeBooking)
      .filter((booking) => booking.courtId === courtId && booking.date === date && isActiveBooking(booking))
      .map((booking) => ({
        id: booking.id,
        startTime: booking.startTime,
        endTime: booking.endTime,
        label: booking.time,
        status: booking.status,
      }));
  }

  function isTimeRangeBooked(courtId, date, startTime, endTime) {
    return getBookedRanges(courtId, date).some((booking) =>
      rangesOverlap(startTime, endTime, booking.startTime, booking.endTime)
    );
  }

  // kept as aliases for old pages/components if needed
  function getBookedTimes(courtId, date) {
    return getBookedRanges(courtId, date).map((range) => range.label);
  }

  function isSlotBooked(courtId, date, time) {
    const endTime = addMinutesToTime(time, 60);
    return isTimeRangeBooked(courtId, date, time, endTime);
  }

  const value = useMemo(
    () => ({
      bookings,
      addBooking,
      cancelBooking,
      approveBooking,
      rejectBooking,
      getBookedRanges,
      isTimeRangeBooked,
      getBookedTimes,
      isSlotBooked,
    }),
    [bookings]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBookings must be used inside BookingProvider');
  }

  return context;
}

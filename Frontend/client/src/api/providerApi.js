const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* =========================
   PROVIDER LIST (CARDS)
========================= */
export async function getAllProviders() {
  const res = await fetch(`${BASE_URL}/v1/providers`);
  if (!res.ok) {
    throw new Error('Failed to fetch providers');
  }
  return res.json();
}

/* =========================
   PROVIDER DASHBOARD
========================= */
export async function getProviderBookings(providerId) {
  const res = await fetch(
    `${BASE_URL}/v1/providers/${providerId}/bookings`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }
  return res.json();
}

/* =========================
   BOOKING ACTIONS
========================= */
export async function acceptBooking(bookingId) {
  await fetch(
    `${BASE_URL}/v1/providers/bookings/${bookingId}/accept`,
    { method: 'POST' }
  );
}

export async function rejectBooking(bookingId) {
  await fetch(
    `${BASE_URL}/v1/providers/bookings/${bookingId}/reject`,
    { method: 'POST' }
  );
}

export async function startBooking(bookingId) {
  await fetch(
    `${BASE_URL}/v1/providers/bookings/${bookingId}/start`,
    { method: 'POST' }
  );
}

export async function completeBooking(bookingId) {
  await fetch(
    `${BASE_URL}/v1/providers/bookings/${bookingId}/complete`,
    { method: 'POST' }
  );
}

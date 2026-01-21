const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAllBookings() {
  const res = await fetch(`${BASE_URL}/v1/admin/bookings`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}

export async function overrideBookingStatus(bookingId, status, reason = 'Admin override') {
  await fetch(
    `${BASE_URL}/v1/admin/bookings/${bookingId}/override-status`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, reason })
    }
  );
}

export async function reassignProvider(bookingId, providerId, reason) {
  await fetch(
    `${BASE_URL}/v1/admin/bookings/${bookingId}/reassign-provider`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerId, reason })
    }
  );
}


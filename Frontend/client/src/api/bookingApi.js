const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createBooking(payload) {
  const res = await fetch(`${BASE_URL}/v1/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error('Failed to create booking');
  }

  return res.json();
}

export async function getBookingById(id) {
  const res = await fetch(`${BASE_URL}/v1/bookings/${id}`);
  if (!res.ok) throw new Error('Failed to fetch booking');
  return res.json();
}

export async function getBookingHistory(id) {
  const res = await fetch(`${BASE_URL}/v1/bookings/${id}/history`);
  if (!res.ok) throw new Error('Failed to fetch history');
  return res.json();
}


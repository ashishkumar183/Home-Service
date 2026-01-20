import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookingById, getBookingHistory } from '../api/bookingApi';
import StatusBadge from '../components/booking/StatusBadge';
import BookingHistory from '../components/booking/BookingHistory';

export default function BookingStatus() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const bookingRes = await getBookingById(id);
        const historyRes = await getBookingHistory(id);

        setBooking(bookingRes.data);
        setHistory(historyRes.data);
      } catch (err) {
        setError('Unable to load booking details');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading booking details...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Booking #{booking.id}
          </h2>
          <StatusBadge status={booking.status} />
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Customer:</strong> {booking.customerName}</p>
          <p><strong>Service:</strong> {booking.serviceType}</p>
          <p>
            <strong>Provider:</strong>{' '}
            {booking.assignedProviderId ?? 'Not Assigned'}
          </p>
        </div>

        <BookingHistory history={history} />
      </div>
    </div>
  );
}

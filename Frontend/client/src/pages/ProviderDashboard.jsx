import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProviderBookings } from '../api/providerApi';
import ProviderBookingCard from '../components/provider/ProviderBookingCard';

export default function ProviderDashboard() {
  const { providerId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadBookings() {
    try {
      setLoading(true);
      const res = await getProviderBookings(providerId);
      setBookings(res.data);
    } catch (err) {
      setError('Unable to load bookings');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, [providerId]);

  if (loading) {
    return <p className="p-6">Loading bookings...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-2">
        Provider Dashboard
      </h1>
      <p className="text-gray-600 mb-6">
        Provider ID: {providerId}
      </p>

      {bookings.length === 0 ? (
        <p className="text-gray-500">
          No assigned bookings at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <ProviderBookingCard
              key={booking.id}
              booking={booking}
              onAction={loadBookings}
            />
          ))}
        </div>
      )}
    </div>
  );
}

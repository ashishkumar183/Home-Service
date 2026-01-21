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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 text-white">
        Loading bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl font-extrabold text-white mb-1">
            Provider Dashboard
          </h1>
          <p className="text-blue-200">
            Provider ID: #{providerId}
          </p>
        </div>

        {/* CONTENT */}
        {bookings.length === 0 ? (
          <div className="rounded-xl bg-white/10 backdrop-blur-sm p-8 text-center text-blue-100">
            No assigned bookings at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
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
    </div>
  );
}

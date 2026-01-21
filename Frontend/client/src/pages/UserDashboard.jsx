import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllBookings } from '../api/adminApi';
import StatusBadge from '../components/booking/StatusBadge';

export default function UserDashboard() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadBookings() {
      const res = await getAllBookings();
      setBookings(res.data.filter(b => b.customerName === name));
    }
    loadBookings();
  }, [name]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-1">
          {name}'s Dashboard
        </h1>
        <p className="text-slate-400 mb-8">
          All bookings created by this user
        </p>

        {bookings.length === 0 ? (
          <p className="text-slate-400">No bookings found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white/5 border border-white/10 backdrop-blur rounded-xl p-6 text-white"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">Booking #{b.id}</h3>
                  <StatusBadge status={b.status} />
                </div>

                <p className="text-sm text-slate-300">
                  Service: {b.serviceType}
                </p>

                <button
                  onClick={() => navigate(`/user/booking/${b.id}`)}
                  className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-500 py-2 rounded-md"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

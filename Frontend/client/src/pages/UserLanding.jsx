import { useNavigate } from 'react-router-dom';

export default function UserLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">

        {/* CREATE BOOKING */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-8 text-white hover:bg-white/10 transition">
          <h2 className="text-2xl font-bold mb-2">Create New Booking</h2>
          <p className="text-slate-400 mb-6">
            Book trusted home services in minutes
          </p>
          <button
            onClick={() => navigate('/user/create')}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-3 rounded-lg font-semibold"
          >
            Create Booking
          </button>
        </div>

        {/* VIEW BOOKINGS */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-8 text-white hover:bg-white/10 transition">
          <h2 className="text-2xl font-bold mb-2">View My Bookings</h2>
          <p className="text-slate-400 mb-6">
            Track status & history of all your bookings
          </p>
          <button
            onClick={() => navigate('/user/select')}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 py-3 rounded-lg font-semibold"
          >
            View Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

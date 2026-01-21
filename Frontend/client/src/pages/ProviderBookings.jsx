export default function ProviderBookings() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl font-extrabold text-white mb-1">
            Provider Dashboard
          </h1>
          <p className="text-blue-200">
            Manage and track your assigned service bookings
          </p>
        </div>

        {/* EMPTY / INFO STATE */}
        <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-8 text-center animate-slide-up">
          <h2 className="text-lg font-semibold text-white mb-2">
            No Bookings Yet
          </h2>
          <p className="text-blue-200 text-sm">
            Assigned bookings will appear here once customers are matched
            to your profile.
          </p>
        </div>

      </div>
    </div>
  );
}

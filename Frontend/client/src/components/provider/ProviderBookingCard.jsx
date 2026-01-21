import StatusBadge from '../booking/StatusBadge';
import {
  acceptBooking,
  rejectBooking,
  startBooking,
  completeBooking
} from '../../api/providerApi';

export default function ProviderBookingCard({ booking, onAction }) {

  async function handle(action) {
    await action(booking.id);
    onAction();
  }

  return (
    <div
      className="
        rounded-xl p-5 bg-white shadow-md
        border-l-4
        border-blue-500
        hover:shadow-lg transition
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">
          Booking #{booking.id}
        </h3>
        <StatusBadge status={booking.status} />
      </div>

      {/* DETAILS */}
      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p><strong>Customer:</strong> {booking.customerName}</p>
        <p><strong>Service:</strong> {booking.serviceType}</p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-2">
        {booking.status === 'ASSIGNED' && (
          <>
            <ActionButton
              label="Accept"
              color="green"
              onClick={() => handle(acceptBooking)}
            />
            <ActionButton
              label="Reject"
              color="red"
              onClick={() => handle(rejectBooking)}
            />
            <ActionButton
              label="Start"
              color="blue"
              onClick={() => handle(startBooking)}
            />
          </>
        )}

        {booking.status === 'IN_PROGRESS' && (
          <ActionButton
            label="Complete"
            color="purple"
            onClick={() => handle(completeBooking)}
          />
        )}
      </div>
    </div>
  );
}

/* REUSABLE BUTTON */
function ActionButton({ label, onClick, color }) {
  const COLORS = {
    green: 'from-green-500 to-emerald-600',
    red: 'from-red-500 to-rose-600',
    blue: 'from-blue-500 to-cyan-600',
    purple: 'from-purple-500 to-indigo-600'
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-1.5 text-sm font-medium text-white rounded-md
        bg-gradient-to-r ${COLORS[color]}
        hover:brightness-110 transition
      `}
    >
      {label}
    </button>
  );
}

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
    onAction(); // refresh list
  }

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">
          Booking #{booking.id}
        </h3>
        <StatusBadge status={booking.status} />
      </div>

      <p className="text-sm text-gray-600">
        <strong>Customer:</strong> {booking.customerName}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Service:</strong> {booking.serviceType}
      </p>

      {/* ACTIONS */}
      <div className="flex gap-2">
        {booking.status === 'ASSIGNED' && (
          <>
            <button
              onClick={() => handle(acceptBooking)}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded"
            >
              Accept
            </button>
            <button
              onClick={() => handle(rejectBooking)}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded"
            >
              Reject
            </button>
            <button
              onClick={() => handle(startBooking)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
            >
              Start
            </button>
          </>
        )}

        {booking.status === 'IN_PROGRESS' && (
          <button
            onClick={() => handle(completeBooking)}
            className="px-3 py-1 text-sm bg-purple-600 text-white rounded"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
}

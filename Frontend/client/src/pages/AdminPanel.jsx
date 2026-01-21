import { useEffect, useState } from 'react';
import {
  getAllBookings,
  overrideBookingStatus,
  reassignProvider
} from '../api/adminApi';
import { getAllProviders } from '../api/providerApi';
import StatusBadge from '../components/booking/StatusBadge';

const STATUS_OPTIONS = [
  'PENDING',
  'ASSIGNED',
  'IN_PROGRESS',
  'COMPLETED',
  'FAILED',
  'CANCELLED'
];

export default function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [providers, setProviders] = useState([]);
  const [reasons, setReasons] = useState({});
  const [activeReasonType, setActiveReasonType] = useState({});
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const bookingsRes = await getAllBookings();
    const providersRes = await getAllProviders();
    setBookings(bookingsRes.data);
    setProviders(providersRes.data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function updateReason(bookingId, value) {
    setReasons((prev) => ({
      ...prev,
      [bookingId]: value
    }));
  }

  async function handleStatusOverride(bookingId, newStatus) {
    setActiveReasonType((prev) => ({
      ...prev,
      [bookingId]: 'STATUS'
    }));

    await overrideBookingStatus(
      bookingId,
      newStatus,
      reasons[bookingId] || 'Admin status override'
    );

    loadData();
  }

  async function handleReassignProvider(bookingId, providerId) {
    if (!providerId) return;

    setActiveReasonType((prev) => ({
      ...prev,
      [bookingId]: 'PROVIDER'
    }));

    await reassignProvider(
      bookingId,
      providerId,
      reasons[bookingId] || 'Admin reassigned provider'
    );

    loadData();
  }

  if (loading) {
    return <p className="p-6">Loading bookings...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Service</th>
              <th className="p-3">Provider</th>
              <th className="p-3">Status</th>
              <th className="p-3">Status Override</th>
              <th className="p-3">Reassign Provider</th>
              <th className="p-3">Reason</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => {
              const assignedProvider = providers.find(
                (p) => p.id === b.assignedProviderId
              );

              return (
                <tr key={b.id} className="border-t align-top">
                  <td className="p-3">{b.id}</td>
                  <td className="p-3">{b.customerName}</td>
                  <td className="p-3">{b.serviceType}</td>

                  <td className="p-3">
                    {assignedProvider
                      ? assignedProvider.name
                      : <span className="text-gray-400">Unassigned</span>}
                  </td>

                  <td className="p-3">
                    <StatusBadge status={b.status} />
                  </td>

                  {/* STATUS OVERRIDE */}
                  <td className="p-3">
                    <select
                      className="border px-2 py-1 text-sm w-full"
                      value={b.status}
                      onChange={(e) =>
                        handleStatusOverride(b.id, e.target.value)
                      }
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* PROVIDER REASSIGN */}
                  <td className="p-3">
                    <select
                      className="border px-2 py-1 text-sm w-full"
                      defaultValue=""
                      onChange={(e) =>
                        handleReassignProvider(b.id, e.target.value)
                      }
                    >
                      <option value="">Select Provider</option>
                      {providers.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* CONDITIONAL REASON */}
                  <td className="p-3">
                    {activeReasonType[b.id] && (
                      <input
                        type="text"
                        className="border px-2 py-1 text-sm w-full bg-gray-50"
                        placeholder={
                          activeReasonType[b.id] === 'STATUS'
                            ? 'Reason for status override'
                            : 'Reason for provider change'
                        }
                        value={reasons[b.id] || ''}
                        onChange={(e) =>
                          updateReason(b.id, e.target.value)
                        }
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

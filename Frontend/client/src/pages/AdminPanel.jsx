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

  function updateReason(id, value) {
    setReasons((prev) => ({ ...prev, [id]: value }));
  }

  async function handleStatusOverride(id, status) {
    setActiveReasonType((p) => ({ ...p, [id]: 'STATUS' }));
    await overrideBookingStatus(id, status, reasons[id] || 'Admin override');
    loadData();
  }

  async function handleReassignProvider(id, providerId) {
    if (!providerId) return;
    setActiveReasonType((p) => ({ ...p, [id]: 'PROVIDER' }));
    await reassignProvider(id, providerId, reasons[id] || 'Admin reassigned');
    loadData();
  }

  if (loading) return <p className="p-6 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-white mb-1">
          Admin Dashboard
        </h1>
        <p className="text-slate-400 mb-8">
          Booking lifecycle & provider control center
        </p>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl bg-white/5 backdrop-blur border border-white/10 shadow-2xl">
          <table className="w-full text-sm text-slate-200">
            <thead className="sticky top-0 bg-white/10 backdrop-blur text-slate-300">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Provider</th>
                <th className="p-4">Status</th>
                <th className="p-4">Override</th>
                <th className="p-4">Reassign</th>
                <th className="p-4">Reason</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => {
                const provider = providers.find(
                  (p) => p.id === b.assignedProviderId
                );

                return (
                  <tr
                    key={b.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-4 font-medium">{b.id}</td>
                    <td className="p-4">{b.customerName}</td>
                    <td className="p-4">{b.serviceType}</td>

                    <td className="p-4">
                      {provider?.name || (
                        <span className="text-slate-500">Unassigned</span>
                      )}
                    </td>

                    <td className="p-4">
                      <StatusBadge status={b.status} />
                    </td>

                    {/* STATUS OVERRIDE */}
                    <td className="p-4">
                      <select
                        className="w-full rounded-md bg-slate-900 border border-white/10 px-2 py-1
                                   focus:ring-2 focus:ring-blue-500"
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
                    <td className="p-4">
                      <select
                        className="w-full rounded-md bg-slate-900 border border-white/10 px-2 py-1
                                   focus:ring-2 focus:ring-purple-500"
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

                    {/* REASON */}
                    <td className="p-4">
                      {activeReasonType[b.id] && (
                        <input
                          className="w-full rounded-md bg-slate-900 border border-white/10 px-2 py-1
                                     text-slate-200 placeholder-slate-500
                                     focus:ring-2 focus:ring-indigo-500 animate-fade-in"
                          placeholder={
                            activeReasonType[b.id] === 'STATUS'
                              ? 'Reason for status change'
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
    </div>
  );
}

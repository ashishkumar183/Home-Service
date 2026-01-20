import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../../api/bookingApi';

export default function CreateBookingForm() {
  const [customerName, setCustomerName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await createBooking({
        customerName,
        serviceType
      });

      // redirect to booking status page
      navigate(`/bookings/${response.data.id}`);
    } catch (err) {
      setError('Unable to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-xl font-semibold mb-4">Create Booking</h2>

      {error && (
        <p className="text-red-500 mb-3 text-sm">{error}</p>
      )}

      <div className="mb-3">
        <label className="block text-sm mb-1">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">Service Type</label>
        <input
          type="text"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Creating...' : 'Create Booking'}
      </button>
    </form>
  );
}

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

      navigate(`/user/booking/${response.data.id}`);
    } catch {
      setError('Unable to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* FULL BLEED BACKGROUND */
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
 flex items-center justify-center px-6">
      
      {/* CONTENT WRAPPER */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT PANEL – STRONG CONTRAST */}
        <div className="hidden md:flex flex-col justify-center px-12 py-14
                        bg-gradient-to-br from-indigo-950 via-indigo-900 to-blue-900
                        text-white relative border border-white/10 backdrop-blur-sm">

          {/* subtle glass effect */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-4 leading-tight">
              Book Home Services <br /> in Minutes
            </h1>

            <p className="text-blue-200 mb-10 max-w-sm">
              Reliable professionals. Transparent workflows.
              Built for scale and operational excellence.
            </p>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 bg-green-400 rounded-full"></span>
                Real-time booking lifecycle
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 bg-green-400 rounded-full"></span>
                Auto provider assignment & retries
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 bg-green-400 rounded-full"></span>
                Admin overrides with audit trail
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL – FORM */}
        <div className="bg-white px-8 py-10 md:px-12 md:py-14">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Create a Booking
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Enter customer and service details
          </p>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Ashish Kumar"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Type
              </label>
              <input
                type="text"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                placeholder="e.g. Plumbing, Home Cleaning"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full rounded-lg py-3 text-sm font-semibold text-white
                transition-all duration-200
                bg-gradient-to-r from-blue-600 to-cyan-500
                hover:from-blue-700 hover:to-cyan-600
                hover:shadow-xl hover:-translate-y-[1px]
                active:translate-y-0
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}
`               }
            >
              {loading ? 'Creating Booking...' : 'Create Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { getAllProviders } from '../api/providerApi';
import ProviderCard from '../components/provider/ProviderCard';

export default function ProviderSelect() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProviders() {
      try {
        const res = await getAllProviders();
        setProviders(res.data);
      } catch (err) {
        setError('Unable to load providers');
      } finally {
        setLoading(false);
      }
    }
    fetchProviders();
  }, []);

  if (loading) {
    return <p className="p-8 text-white">Loading providers...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-300">{error}</p>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 px-6 py-14">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Select a Provider
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto">
            Choose a provider to view and manage their assigned bookings
          </p>
        </div>

        {/* PROVIDER GRID */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-slide-up">
          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

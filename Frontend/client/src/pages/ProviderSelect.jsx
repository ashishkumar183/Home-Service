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
    return <p className="p-6">Loading providers...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-2">
        Select a Provider
      </h1>
      <p className="text-gray-600 mb-6">
        Choose a provider to view their dashboard
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
          />
        ))}
      </div>
    </div>
  );
}

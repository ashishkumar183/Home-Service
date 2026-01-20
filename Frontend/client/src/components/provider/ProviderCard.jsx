import { useNavigate } from 'react-router-dom';

export default function ProviderCard({ provider }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {provider.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Provider ID: {provider.id}
        </p>
      </div>

      <button
        onClick={() =>
          navigate(`/provider/${provider.id}/dashboard`)
        }
        className="mt-6 bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
      >
        View Dashboard
      </button>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';

export default function ProviderCard({ provider }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        relative rounded-2xl p-[1px]
        bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600
        hover:scale-[1.02] transition-transform duration-300
      "
    >
      <div
        className="
          h-full rounded-2xl bg-white/90 backdrop-blur-sm
          p-6 flex flex-col justify-between shadow-lg
        "
      >
        {/* PROVIDER INFO */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {provider.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Provider ID: #{provider.id}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() =>
            navigate(`/provider/${provider.id}/dashboard`)
          }
          className="
            mt-6 w-full rounded-lg py-2.5 text-sm font-semibold text-white
            bg-gradient-to-r from-blue-600 to-cyan-500
            hover:from-blue-700 hover:to-cyan-600
            shadow-md hover:shadow-xl
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-cyan-400
          "
        >
          View Dashboard →
        </button>
      </div>
    </div>
  );
}

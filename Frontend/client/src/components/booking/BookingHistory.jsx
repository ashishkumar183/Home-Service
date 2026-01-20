export default function BookingHistory({ history }) {
  if (!history.length) {
    return <p className="text-sm text-gray-500">No history available</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="font-semibold mb-4">Booking Timeline</h3>

      <div className="space-y-4">
        {history.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>

            <div>
              <p className="text-sm font-medium">
                {item.fromStatus ?? 'START'} → {item.toStatus}
              </p>
              <p className="text-xs text-gray-500">
                {item.changedBy}
                {item.reason && ` • ${item.reason}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

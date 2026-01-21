import { useEffect, useState } from 'react';
import { getAllBookings } from '../api/adminApi';
import { useNavigate } from 'react-router-dom';

export default function UserSelect() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsers() {
      const res = await getAllBookings();
      const uniqueUsers = [...new Set(res.data.map(b => b.customerName))];
      setUsers(uniqueUsers);
    }
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">
          Select a User
        </h1>
        <p className="text-slate-400 mb-8">
          Choose a user to view booking history
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((name) => (
            <div
              key={name}
              className="bg-white/5 border border-white/10 backdrop-blur rounded-xl p-6 text-white hover:bg-white/10 transition"
            >
              <h3 className="text-lg font-semibold">{name}</h3>
              <button
                onClick={() => navigate(`/user/${name}/dashboard`)}
                className="mt-4 w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-2 rounded-md"
              >
                View Dashboard
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

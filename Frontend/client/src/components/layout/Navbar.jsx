import { NavLink } from 'react-router-dom';

const base =
  'px-4 py-2 rounded-md text-sm font-medium transition';

const active =
  'bg-blue-600 text-white';

const inactive =
  'text-gray-300 hover:text-white hover:bg-slate-700';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 px-6 py-4 flex justify-between items-center">
      <div className="text-white font-bold text-lg">
        HomeServices 🚀
      </div>

      <div className="flex gap-3">
        {/* USER */}
        <NavLink
          to="/user/create"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          User
        </NavLink>

        {/* PROVIDER (IMPORTANT FIX) */}
        <NavLink
          to="/provider"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Provider
        </NavLink>

        {/* ADMIN */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

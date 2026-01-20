import { NavLink } from 'react-router-dom';

const linkClass =
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
        <NavLink
          to="/user/create"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? active : inactive}`
          }
        >
          User
        </NavLink>

        <NavLink
          to="/provider/bookings"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? active : inactive}`
          }
        >
          Provider
        </NavLink>

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? active : inactive}`
          }
        >
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

import { Routes, Route, Navigate } from 'react-router-dom';

/* =======================
   USER PAGES
======================= */
import CreateBooking from '../pages/CreateBooking';
import BookingStatus from '../pages/BookingStatus';

/* =======================
   PROVIDER PAGES
======================= */
import ProviderSelect from '../pages/ProviderSelect';
import ProviderDashboard from '../pages/ProviderDashboard';

/* =======================
   ADMIN PAGES
======================= */
import AdminPanel from '../pages/AdminPanel';

export default function AppRoutes() {
  return (
    <Routes>
      {/* -----------------------
         DEFAULT REDIRECT
      ------------------------ */}
      <Route path="/" element={<Navigate to="/user/create" />} />

      {/* -----------------------
         USER ROUTES
      ------------------------ */}
      <Route path="/user/create" element={<CreateBooking />} />
      <Route path="/user/booking/:id" element={<BookingStatus />} />

      {/* -----------------------
         PROVIDER ROUTES
      ------------------------ */}
      {/* Provider selection (cards) */}
      <Route path="/provider" element={<ProviderSelect />} />

      {/* Individual provider dashboard */}
      <Route
        path="/provider/:providerId/dashboard"
        element={<ProviderDashboard />}
      />

      {/* -----------------------
         ADMIN ROUTES
      ------------------------ */}
      <Route path="/admin/dashboard" element={<AdminPanel />} />

      {/* -----------------------
         FALLBACK (OPTIONAL)
      ------------------------ */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

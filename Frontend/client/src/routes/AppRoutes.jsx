import { Routes, Route, Navigate } from 'react-router-dom';

// User pages
import CreateBooking from '../pages/CreateBooking';
import BookingStatus from '../pages/BookingStatus';

// Provider pages
import ProviderBookings from '../pages/ProviderBookings';

// Admin pages
import AdminPanel from '../pages/AdminPanel';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/user/create" />} />

      {/* User */}
      <Route path="/user/create" element={<CreateBooking />} />
      <Route path="/user/booking/:id" element={<BookingStatus />} />

      {/* Provider */}
      <Route path="/provider/bookings" element={<ProviderBookings />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminPanel />} />
    </Routes>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateBooking from '../pages/CreateBooking';
// import BookingStatus from '../pages/BookingStatus';
// import AdminPanel from '../pages/AdminPanel';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateBooking />} />
        {/* <Route path="/bookings/:id" element={<BookingStatus />} /> */}
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

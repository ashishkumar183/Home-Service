const express = require('express');
const ProviderController = require('../../controllers/provider-controller');

const router = express.Router();

/* =====================
   PROVIDER BOOKINGS
===================== */
router.get('/', ProviderController.getAll);

// Get bookings assigned to provider
router.get(
  '/:providerId/bookings',
  ProviderController.getAssignedBookings
);

// Booking actions
router.post(
  '/bookings/:bookingId/accept',
  ProviderController.acceptBooking
);

router.post(
  '/bookings/:bookingId/reject',
  ProviderController.rejectBooking
);

router.post(
  '/bookings/:bookingId/start',
  ProviderController.startBooking
);

router.post(
  '/bookings/:bookingId/complete',
  ProviderController.completeBooking
);

module.exports = router;

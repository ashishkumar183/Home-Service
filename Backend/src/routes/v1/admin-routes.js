const express = require('express');
const AdminController = require('../../controllers/admin-controller');

const router = express.Router();

router.get('/bookings', AdminController.getAllBookings);
router.get('/bookings/:id/history', AdminController.getBookingHistory);
router.patch('/bookings/:id/override-status', AdminController.overrideStatus);
router.patch('/bookings/:id/reassign-provider', AdminController.reassignProvider);

module.exports = router;

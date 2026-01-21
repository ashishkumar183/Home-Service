const express = require('express');
const BookingController = require('../../controllers/booking-controller');

const router = express.Router();

router.post('/', BookingController.createBooking);
router.get('/:id/history', BookingController.getBookingHistory);
router.get('/:id', BookingController.getBookingById);



module.exports = router;

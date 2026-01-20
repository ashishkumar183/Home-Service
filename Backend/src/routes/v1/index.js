const express = require('express');

const {InfoController} = require('../../controllers')
const BookingRoutes = require('./booking-routes');
const ProviderRoutes = require('./provider-routes');
const router = express.Router();

router.use('/bookings', BookingRoutes);
router.get('/info',InfoController.info);
router.use('/providers', ProviderRoutes);

module.exports = router; 
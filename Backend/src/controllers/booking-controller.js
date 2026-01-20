const { StatusCodes } = require('http-status-codes');
const BookingService = require('../services/booking-service');

class BookingController {
  static async createBooking(req, res) {
    try {
      const booking = await BookingService.createBooking(req.body);

      return res.status(StatusCodes.CREATED).json({
        success: true,
        data: booking
      });
    } catch (error) {
      return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = BookingController;

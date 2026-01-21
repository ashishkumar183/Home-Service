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

  static async getBookingById(req, res) {
  try {
    const booking = await BookingService.getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

static async getBookingHistory(req, res) {
  try {
    const history = await BookingService.getBookingHistory(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

}

module.exports = BookingController;

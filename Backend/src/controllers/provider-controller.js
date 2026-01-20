const { StatusCodes } = require('http-status-codes');
const ProviderService = require('../services/provider-service');

class ProviderController {
  static async getAssignedBookings(req, res) {
    const bookings = await ProviderService.getAssignedBookings(req.params.providerId);
    return res.status(StatusCodes.OK).json({ success: true, data: bookings });
  }

  static async acceptBooking(req, res) {
    await ProviderService.acceptBooking(req.params.bookingId);
    return res.status(StatusCodes.OK).json({ success: true });
  }

  static async rejectBooking(req, res) {
    await ProviderService.rejectBooking(req.params.bookingId);
    return res.status(StatusCodes.OK).json({ success: true });
  }

  static async startBooking(req, res) {
    await ProviderService.startBooking(req.params.bookingId);
    return res.status(StatusCodes.OK).json({ success: true });
  }

  static async completeBooking(req, res) {
    await ProviderService.completeBooking(req.params.bookingId);
    return res.status(StatusCodes.OK).json({ success: true });
  }
}

module.exports = ProviderController;

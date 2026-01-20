const { StatusCodes } = require('http-status-codes');
const ProviderService = require('../services/provider-service');

class ProviderController {
  static async getAssignedBookings(req, res) {
    try {
      const bookings = await ProviderService.getAssignedBookings(
        req.params.providerId
      );

      return res.status(StatusCodes.OK).json({
        success: true,
        data: bookings
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  }

  static async acceptBooking(req, res) {
    try {
      await ProviderService.acceptBooking(req.params.bookingId);
      return res.status(StatusCodes.OK).json({ success: true });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  }

  static async rejectBooking(req, res) {
    try {
      await ProviderService.rejectBooking(req.params.bookingId);
      return res.status(StatusCodes.OK).json({ success: true });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  }

  static async startBooking(req, res) {
    try {
      await ProviderService.startBooking(req.params.bookingId);
      return res.status(StatusCodes.OK).json({ success: true });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  }

  static async completeBooking(req, res) {
    try {
      await ProviderService.completeBooking(req.params.bookingId);
      return res.status(StatusCodes.OK).json({ success: true });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  }

  static async getAll(req, res) {
  try {
    const providers = await ProviderService.getAllProviders();
    return res.status(200).json({
      success: true,
      data: providers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

}

module.exports = ProviderController;

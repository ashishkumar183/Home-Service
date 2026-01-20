const { StatusCodes } = require('http-status-codes');
const AdminService = require('../services/admin-service');

class AdminController {
  static async getAllBookings(req, res) {
    const bookings = await AdminService.getAllBookings();
    return res.status(StatusCodes.OK).json({ success: true, data: bookings });
  }

  static async getBookingHistory(req, res) {
    const history = await AdminService.getBookingHistory(req.params.id);
    return res.status(StatusCodes.OK).json({ success: true, data: history });
  }

  static async overrideStatus(req, res) {
    const { status, reason } = req.body;

    await AdminService.overrideStatus(req.params.id, status, reason);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Booking status overridden by admin'
    });
  }

  static async reassignProvider(req, res) {
    const { providerId, reason } = req.body;

    await AdminService.reassignProvider(req.params.id, providerId, reason);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Provider reassigned by admin'
    });
  }
}

module.exports = AdminController;

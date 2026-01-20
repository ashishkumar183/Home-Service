const BookingRepository = require('../repositories/booking-repository');
const ProviderRepository = require('../repositories/provider-repository');
const BookingHistoryRepository = require('../repositories/booking-history-repository');
const { bookingStatus, userRole } = require('../utils');

class AdminService {
  static async getAllBookings() {
    return BookingRepository.getAll();
  }

  static async getBookingHistory(bookingId) {
    return BookingHistoryRepository.getByBookingId(bookingId);
  }

  static async overrideStatus(bookingId, newStatus, reason) {
    const booking = await BookingRepository.getById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    await BookingRepository.updateStatus(bookingId, newStatus);

    await BookingHistoryRepository.create({
      bookingId,
      fromStatus: booking.status,
      toStatus: newStatus,
      changedBy: userRole.ADMIN,
      reason
    });
  }

  static async reassignProvider(bookingId, providerId, reason) {
    const booking = await BookingRepository.getById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    await BookingRepository.assignProvider(
      bookingId,
      providerId,
      bookingStatus.ASSIGNED
    );

    await BookingHistoryRepository.create({
      bookingId,
      fromStatus: booking.status,
      toStatus: bookingStatus.ASSIGNED,
      changedBy: userRole.ADMIN,
      reason
    });
  }
}

module.exports = AdminService;

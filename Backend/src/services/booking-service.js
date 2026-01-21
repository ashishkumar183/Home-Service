const BookingRepository = require('../repositories/booking-repository');
const ProviderRepository = require('../repositories/provider-repository');
const BookingHistoryRepository = require('../repositories/booking-history-repository');
const { bookingStatus, userRole } = require('../utils');

class BookingService {
  static async createBooking(data) {
    // 1. Create booking
    const booking = await BookingRepository.create({
      customerName: data.customerName,
      serviceType: data.serviceType,
      status: bookingStatus.PENDING
    });

    // 2. Log history (PENDING)
    await BookingHistoryRepository.create({
      bookingId: booking.id,
      fromStatus: null,
      toStatus: bookingStatus.PENDING,
      changedBy: userRole.CUSTOMER
    });

    // 3. Auto-assign provider
    const provider = await ProviderRepository.findAvailable();

    if (provider) {
      await BookingRepository.assignProvider(
        booking.id,
        provider.id,
        bookingStatus.ASSIGNED
      );

      await BookingHistoryRepository.create({
        bookingId: booking.id,
        fromStatus: bookingStatus.PENDING,
        toStatus: bookingStatus.ASSIGNED,
        changedBy: userRole.SYSTEM
      });
    }

    return await BookingRepository.getById(booking.id);
  }

  static async getBookingById(id) {
  return BookingRepository.getById(id);
}

static async getBookingHistory(bookingId) {
  return BookingHistoryRepository.getByBookingId(bookingId);
}

}

module.exports = BookingService;

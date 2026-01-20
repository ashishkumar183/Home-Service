const { Booking } = require('../models');

class BookingRepository {
  static async create(data) {
    return Booking.create(data);
  }

  static async assignProvider(bookingId, providerId, status) {
    return Booking.update(
      { assignedProviderId: providerId, status },
      { where: { id: bookingId } }
    );
  }
}

module.exports = BookingRepository;

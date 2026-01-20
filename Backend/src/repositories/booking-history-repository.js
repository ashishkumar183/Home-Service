const { BookingHistory } = require('../models');

class BookingHistoryRepository {
  static async create(data) {
    return BookingHistory.create(data);
  }
  static async getByBookingId(bookingId) {
    return BookingHistory.findAll({
        where: { bookingId },
        order: [['createdAt', 'ASC']]
        });
 }

}

module.exports = BookingHistoryRepository;

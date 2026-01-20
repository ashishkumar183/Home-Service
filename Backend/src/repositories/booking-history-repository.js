const { BookingHistory } = require('../models');

class BookingHistoryRepository {
  static async create(data) {
    return BookingHistory.create(data);
  }
}

module.exports = BookingHistoryRepository;

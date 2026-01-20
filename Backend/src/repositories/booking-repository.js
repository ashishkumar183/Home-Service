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

  static async updateStatus(bookingId, status) {
    return Booking.update({ status }, { where: { id: bookingId } });
  }

  static async getByProvider(providerId) {
    return Booking.findAll({
      where: { assignedProviderId: providerId }
    });
  }

  static async getById(id) {
    return Booking.findByPk(id);
  }

  static async getAll() {
    return Booking.findAll();
  }

}

module.exports = BookingRepository;

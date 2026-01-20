const BookingRepository = require('../repositories/booking-repository');
const ProviderRepository = require('../repositories/provider-repository');
const BookingHistoryRepository = require('../repositories/booking-history-repository');
const { bookingStatus, userRole } = require('../utils');


class ProviderService {
    
  static async getAllProviders() {
        return ProviderRepository.getAll();
}
  /* =====================
     GET ASSIGNED BOOKINGS
  ====================== */
  static async getAssignedBookings(providerId) {
    return BookingRepository.getByProvider(providerId);
  }

  /* =====================
     ACCEPT BOOKING
  ====================== */
  static async acceptBooking(bookingId) {
    const booking = await BookingRepository.getById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.status !== bookingStatus.ASSIGNED) {
      throw new Error('Only ASSIGNED bookings can be accepted');
    }

    await BookingHistoryRepository.create({
      bookingId,
      fromStatus: bookingStatus.ASSIGNED,
      toStatus: bookingStatus.ASSIGNED,
      changedBy: userRole.PROVIDER,
      reason: 'Provider accepted booking'
    });
  }

  /* =====================
     REJECT BOOKING
  ====================== */
  static async rejectBooking(bookingId) {
    const booking = await BookingRepository.getById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.status !== bookingStatus.ASSIGNED) {
      throw new Error('Only ASSIGNED bookings can be rejected');
    }

    // Mark booking failed
    await BookingRepository.updateStatus(
      bookingId,
      bookingStatus.FAILED
    );

    await BookingHistoryRepository.create({
      bookingId,
      fromStatus: bookingStatus.ASSIGNED,
      toStatus: bookingStatus.FAILED,
      changedBy: userRole.PROVIDER,
      reason: 'Provider rejected booking'
    });

    // Mark current provider unavailable
    await ProviderRepository.markUnavailable(
      booking.assignedProviderId
    );

    // Retry assignment
    const newProvider = await ProviderRepository.findAvailable();

    if (newProvider) {
      await BookingRepository.assignProvider(
        bookingId,
        newProvider.id,
        bookingStatus.ASSIGNED
      );

      await BookingHistoryRepository.create({
        bookingId,
        fromStatus: bookingStatus.FAILED,
        toStatus: bookingStatus.ASSIGNED,
        changedBy: userRole.SYSTEM,
        reason: 'Retry assignment'
      });
    }
  }

  /* =====================
     START BOOKING
  ====================== */
  static async startBooking(bookingId) {
    const booking = await BookingRepository.getById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.status !== bookingStatus.ASSIGNED) {
      throw new Error('Only ASSIGNED bookings can be started');
    }

    await BookingRepository.updateStatus(
      bookingId,
      bookingStatus.IN_PROGRESS
    );

    await ProviderRepository.markUnavailable(
      booking.assignedProviderId
    );

    await BookingHistoryRepository.create({
      bookingId,
      fromStatus: bookingStatus.ASSIGNED,
      toStatus: bookingStatus.IN_PROGRESS,
      changedBy: userRole.PROVIDER
    });


  }

  /* =====================
     COMPLETE BOOKING
  ====================== */
  static async completeBooking(bookingId) {
    const booking = await BookingRepository.getById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.status !== bookingStatus.IN_PROGRESS) {
      throw new Error('Only IN_PROGRESS bookings can be completed');
    }

    await BookingRepository.updateStatus(
      bookingId,
      bookingStatus.COMPLETED
    );

    await ProviderRepository.markAvailable(
      booking.assignedProviderId
    );

    await BookingHistoryRepository.create({
      bookingId,
      fromStatus: bookingStatus.IN_PROGRESS,
      toStatus: bookingStatus.COMPLETED,
      changedBy: userRole.PROVIDER
    });
  }
}

module.exports = ProviderService;

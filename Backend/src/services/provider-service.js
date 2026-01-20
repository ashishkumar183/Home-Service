const BookingRepository = require('../repositories/booking-repository');
const ProviderRepository = require('../repositories/provider-repository');
const BookingHistoryRepository = require('../repositories/booking-history-repository');
const { bookingStatus, userRole } = require('../utils');

class ProviderService {
  static async getAssignedBookings(providerId) {
    return BookingRepository.getByProvider(providerId);
  }

  static async acceptBooking(bookingId) {
    // no status change, but log accept
    await BookingHistoryRepository.create({
      bookingId,
      fromStatus: bookingStatus.ASSIGNED,
      toStatus: bookingStatus.ASSIGNED,
      changedBy: userRole.PROVIDER,
      reason: 'Provider accepted booking'
    });
  }

  static async rejectBooking(bookingId) {
  // 1. Fetch booking
  const booking = await BookingRepository.getById(bookingId);

  if (!booking) {
    throw new Error('Booking not found');
  }

  // 2. Validate state
  if (booking.status !== bookingStatus.ASSIGNED) {
    throw new Error('Only ASSIGNED bookings can be rejected');
  }

  // 3. Mark booking as FAILED
  await BookingRepository.updateStatus(
    bookingId,
    bookingStatus.FAILED
  );

  // 4. Log rejection
  await BookingHistoryRepository.create({
    bookingId,
    fromStatus: bookingStatus.ASSIGNED,
    toStatus: bookingStatus.FAILED,
    changedBy: userRole.PROVIDER,
    reason: 'Provider rejected booking'
  });

  // 5. Mark rejecting provider unavailable
  await ProviderRepository.markUnavailable(booking.assignedProviderId);

  // 6. Retry assignment
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

  static async startBooking(bookingId) {
  const booking = await BookingRepository.getById(bookingId);

  await BookingRepository.updateStatus(
    bookingId,
    bookingStatus.IN_PROGRESS
  );

  // 👇 mark provider busy
  await ProviderRepository.markUnavailable(booking.assignedProviderId);

  await BookingHistoryRepository.create({
    bookingId,
    fromStatus: bookingStatus.ASSIGNED,
    toStatus: bookingStatus.IN_PROGRESS,
    changedBy: userRole.PROVIDER
  });
}


  static async completeBooking(bookingId) {
  const booking = await BookingRepository.getById(bookingId);

  await BookingRepository.updateStatus(
    bookingId,
    bookingStatus.COMPLETED
  );

  // 👇 free provider
  await ProviderRepository.markAvailable(booking.assignedProviderId);

  await BookingHistoryRepository.create({
    bookingId,
    fromStatus: bookingStatus.IN_PROGRESS,
    toStatus: bookingStatus.COMPLETED,
    changedBy: userRole.PROVIDER
  });
}

}

module.exports = ProviderService;

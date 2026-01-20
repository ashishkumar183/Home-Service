const { bookingStatus } = require('../utils');

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    serviceType: {
      type: DataTypes.STRING,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM(
        bookingStatus.PENDING,
        bookingStatus.ASSIGNED,
        bookingStatus.IN_PROGRESS,
        bookingStatus.COMPLETED,
        bookingStatus.CANCELLED,
        bookingStatus.FAILED
      ),
      allowNull: false,
      defaultValue: bookingStatus.PENDING
    },

    assignedProviderId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  Booking.associate = (models) => {
    Booking.hasMany(models.BookingHistory, {
      foreignKey: 'bookingId',
      as: 'history'
    });
  };

  return Booking;
};

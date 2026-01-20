const { userRole } = require('../utils');

module.exports = (sequelize, DataTypes) => {
  const BookingHistory = sequelize.define('BookingHistory', {
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    fromStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },

    toStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },

    changedBy: {
      type: DataTypes.ENUM(
        userRole.CUSTOMER,
        userRole.PROVIDER,
        userRole.SYSTEM,
        userRole.ADMIN
      ),
      allowNull: false
    },

    reason: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  BookingHistory.associate = (models) => {
    BookingHistory.belongsTo(models.Booking, {
      foreignKey: 'bookingId',
      as: 'booking'
    });
  };

  return BookingHistory;
};

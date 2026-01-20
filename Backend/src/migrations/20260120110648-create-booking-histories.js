'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookingHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      bookingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Bookings',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      fromStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },

      toStatus: {
        type: Sequelize.STRING,
        allowNull: false
      },

      changedBy: {
        type: Sequelize.ENUM(
          'CUSTOMER',
          'PROVIDER',
          'SYSTEM',
          'ADMIN'
        ),
        allowNull: false
      },

      reason: {
        type: Sequelize.STRING,
        allowNull: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('BookingHistories');
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      customerName: {
        type: Sequelize.STRING,
        allowNull: false
      },

      serviceType: {
        type: Sequelize.STRING,
        allowNull: false
      },

      status: {
        type: Sequelize.ENUM(
          'PENDING',
          'ASSIGNED',
          'IN_PROGRESS',
          'COMPLETED',
          'CANCELLED',
          'FAILED'
        ),
        allowNull: false,
        defaultValue: 'PENDING'
      },

      assignedProviderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Providers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Bookings');
  }
};

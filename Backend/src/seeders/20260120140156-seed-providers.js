'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Providers', [
  { name: 'Ramesh Kumar', isAvailable: true, createdAt: new Date(), updatedAt: new Date() },
  { name: 'Suresh Verma', isAvailable: true, createdAt: new Date(), updatedAt: new Date() },
  { name: 'Amit Sharma', isAvailable: true, createdAt: new Date(), updatedAt: new Date() },
  { name: 'Rajesh Singh', isAvailable: true, createdAt: new Date(), updatedAt: new Date() },
  { name: 'Vikram Patel', isAvailable: true, createdAt: new Date(), updatedAt: new Date() },
  { name: 'Anil Gupta', isAvailable: true, createdAt: new Date(), updatedAt: new Date() },
  { name: 'Sunil Mehta', isAvailable: true, createdAt: new Date(), updatedAt: new Date() },
  { name: 'Deepak Yadav', isAvailable: true, createdAt: new Date(), updatedAt: new Date() }
]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Providers', null, {});
  }
};

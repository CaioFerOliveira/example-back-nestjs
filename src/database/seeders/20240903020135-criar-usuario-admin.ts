'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        password: '$2b$10$GLEjc.GosJ2xNQoYM8GMhO42jwMB9yEUmPtIV3DQMr6Cfmwdzbc6m',
        name: 'Administrador Jg',
        email: 'email@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};

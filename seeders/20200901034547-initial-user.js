const bcrypt = require('bcrypt')
const sequelize = require('sequelize')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'egon tiedemand',
      password: bcrypt.hashSync('12345', 10),
      email: 'egon23@gmail.com',
      birth_date: '2002-12-02',
      avatar: 'egon.jpg',
      created_at: sequelize.literal('CURRENT_TIMESTAMP'),
      updated_at: sequelize.literal('CURRENT_TIMESTAMP')
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
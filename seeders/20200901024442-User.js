'use strict';

const bcrpyt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'disa',
      password: bcrpyt.hashSync('disa', 10),
      avatar: '',
      date_birth: '1996-04-11',
      email: 'disaada@gmail.com',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW'),
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};

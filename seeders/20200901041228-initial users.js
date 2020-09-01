'use strict';
const bcrypt = require ('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('Users', [{
        name: 'John Doe',
        password: bcrypt.hashSync('12345', 10),
        email: 'jon@gmail.com',
        avatar: '',
        birth_date: '1999-09-09',
        created_at: Sequelize.fn('NOW'),
        updated_at: Sequelize.fn('NOW')
     }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkDelete('Users', null, {});
     
  }
};

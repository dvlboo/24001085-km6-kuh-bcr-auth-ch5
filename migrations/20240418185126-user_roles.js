'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users','roles', {
      type: Sequelize.ENUM('superadmin', 'admin', 'user'),
      allowNull : true,
      defaultValue : 'user'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'roles')
  }
};

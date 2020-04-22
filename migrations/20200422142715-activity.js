'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Activities', {
      uuid: {
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Activities');
  }
};

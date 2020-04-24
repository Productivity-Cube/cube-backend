'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      uuid: {
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activityId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productivityRate: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};

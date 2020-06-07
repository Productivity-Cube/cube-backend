module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      uuid: '5de07dca-5073-454b-bf1a-4061ac1f7137',
      name: 'test',
    }])
  },
  down: (queryInterface, Sequelize) => {
  }
};

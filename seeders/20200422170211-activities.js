module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Activities', [
      {
        uuid: '5de07dca-5073-454b-bf1a-4061ac1f7137',
        name: 'Break',
      },
      {
        uuid: 'b168cdd2-492f-4720-a85f-4fa08c64eb87',
        name: 'Meeting',
      },
      {
        uuid: '0b9662ac-0113-45f2-9092-340d8e7b16b0',
        name: 'Work',
      },
      {
        uuid: '2fdea55c-6756-4be3-a9de-09c2f00c5847',
        name: 'Call',
      },
      {
        uuid: 'db883dad-27b4-475d-a28c-4e3351598597',
        name: 'Planning',
      },
      {
        uuid: 'c1b218d7-611a-4ebf-b725-25e52374c040',
        name: 'Off',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Activities', null, {});
  }
};

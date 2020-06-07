const uuid = require('uuid')
const moment = require('moment')
module.exports = {
  up: (queryInterface, Sequelize) => {
    const activityIds = [
      '5de07dca-5073-454b-bf1a-4061ac1f7137',
      'b168cdd2-492f-4720-a85f-4fa08c64eb87',
      '0b9662ac-0113-45f2-9092-340d8e7b16b0',
      '2fdea55c-6756-4be3-a9de-09c2f00c5847',
      'db883dad-27b4-475d-a28c-4e3351598597',
      'c1b218d7-611a-4ebf-b725-25e52374c040',
    ]
    const productivityRates = [1, 2, 3, null]
    const events = []
    let oldDate = moment()
    for (let i = 0; i < 1000; i++) {
      const date = moment().subtract(Math.floor(i / 30), "day").subtract(i * Math.random() * 120, "minute")
      const rand = Math.floor(Math.random() * activityIds.length)
      events.push({
        uuid: uuid.v4(),
        userId: '5de07dca-5073-454b-bf1a-4061ac1f7137',
        activityId: activityIds[rand],
        productivityRate: productivityRates[Math.floor( productivityRates.length / (rand + 1))],
        createdAt: date.toDate(),
        updatedAt: date.toDate(),
        time: oldDate.subtract(date).minutes()
      })
      oldDate = date;
    }

    return queryInterface.bulkInsert('Events', events);
  },
  down: (queryInterface, Sequelize) => {
  }
};

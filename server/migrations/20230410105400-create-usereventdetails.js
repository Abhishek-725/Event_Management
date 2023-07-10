'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usereventdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      event_name: {
        type: Sequelize.STRING
      },
      decoration_name: {
        type: Sequelize.STRING
      },
      decoration_type: {
        type: Sequelize.STRING
      },
      venue_name: {
        type: Sequelize.STRING
      },
      venue_address: {
        type: Sequelize.STRING
      },
      event_date: {
        type: Sequelize.DATE
      },
      event_time: {
        type: Sequelize.TIME
      },
      event_total: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usereventdetails');
  }
};
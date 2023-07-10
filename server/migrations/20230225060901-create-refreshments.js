'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('refreshments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      refreshMent_id: {
        type: Sequelize.INTEGER
      },
      refreshMent_name: {
        type: Sequelize.STRING
      },
      refreshMent_description: {
        type: Sequelize.STRING
      },
      refreshMent_price: {
        type: Sequelize.INTEGER
      },
      refreshMent_image: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('refreshments');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('starters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      starter_id: {
        type: Sequelize.INTEGER
      },
      starter_name: {
        type: Sequelize.STRING
      },
      starter_description: {
        type: Sequelize.STRING
      },
      starter_price: {
        type: Sequelize.INTEGER
      },
      starter_image: {
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
    await queryInterface.dropTable('starters');
  }
};
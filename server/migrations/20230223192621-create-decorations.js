'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('decorations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      decoration_id: {
        type: Sequelize.INTEGER
      },
      decoration_name: {
        type: Sequelize.STRING
      },
      decoration_type: {
        type: Sequelize.STRING
      },
      decoration_image: {
        type: Sequelize.STRING
      },
      decoration_price: {
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
    await queryInterface.dropTable('decorations');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deserts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      desert_id: {
        type: Sequelize.INTEGER
      },
      desert_name: {
        type: Sequelize.STRING
      },
      desert_description: {
        type: Sequelize.STRING
      },
      desert_price: {
        type: Sequelize.INTEGER
      },
      desert_image: {
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
    await queryInterface.dropTable('deserts');
  }
};
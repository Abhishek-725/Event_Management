'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('maincourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maincourse_id: {
        type: Sequelize.INTEGER
      },
      maincourse_name: {
        type: Sequelize.STRING
      },
      maincourse_type: {
        type: Sequelize.STRING
      },
      maincourse_price: {
        type: Sequelize.INTEGER
      },
      maincourse_description: {
        type: Sequelize.STRING
      },
      maincourse_image: {
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
    await queryInterface.dropTable('maincourses');
  }
};
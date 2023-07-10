'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class maincourses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  maincourses.init({
    maincourse_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    maincourse_name: DataTypes.STRING,
    maincourse_type: DataTypes.STRING,
    maincourse_price: DataTypes.INTEGER,
    maincourse_description: DataTypes.STRING,
    maincourse_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'maincourses',
  });
  return maincourses;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class decorations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  decorations.init({
    decoration_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    decoration_name: DataTypes.STRING,
    decoration_type: DataTypes.STRING,
    decoration_image: DataTypes.STRING,
    decoration_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'decorations',
  });
  return decorations;
};
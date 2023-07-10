'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class starters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  starters.init({
    starter_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    starter_name: DataTypes.STRING,
    starter_description: DataTypes.STRING,
    starter_price: DataTypes.INTEGER,
    starter_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'starters',
  });
  return starters;
};
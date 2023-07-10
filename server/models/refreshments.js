'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refreshments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  refreshments.init({
    refreshMent_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    refreshMent_name: DataTypes.STRING,
    refreshMent_description: DataTypes.STRING,
    refreshMent_price: DataTypes.INTEGER,
    refreshMent_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'refreshments',
  });
  return refreshments;
};
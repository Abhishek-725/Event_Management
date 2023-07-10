'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userstarters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userstarters.init({
    userstarters_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    userstarters_name: DataTypes.STRING,
    userstarters_price: DataTypes.INTEGER,
    userstarters_quantity: DataTypes.INTEGER,
    userstarters_total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userstarters',
  });
  return userstarters;
};
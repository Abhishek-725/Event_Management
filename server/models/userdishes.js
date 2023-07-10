'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userdishes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userdishes.init({
    userdishes_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    userdishes_name: DataTypes.STRING,
    userdishes_type: DataTypes.STRING,
    userdishes_price: DataTypes.INTEGER,
    userdishes_quantity: DataTypes.INTEGER,
    userdishes_total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userdishes',
  });
  return userdishes;
};
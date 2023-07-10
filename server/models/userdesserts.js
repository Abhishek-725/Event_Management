'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userdesserts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userdesserts.init({
    userdesserts_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    userdesserts_name: DataTypes.STRING,
    userdesserts_price: DataTypes.INTEGER,
    userdesserts_quantity: DataTypes.INTEGER,
    userdesserts_total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userdesserts',
  });
  return userdesserts;
};
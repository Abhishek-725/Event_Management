'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payments.init({
    payments_id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id:DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    paid_amount: DataTypes.INTEGER,
    balance_amount: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payments',
  });
  return payments;
};
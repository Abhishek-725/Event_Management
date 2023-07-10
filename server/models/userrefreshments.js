'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userrefreshments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userrefreshments.init({
    userRefreshments_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    userRefreshments_name: DataTypes.STRING,
    userRefreshments_price: DataTypes.INTEGER,
    userRefreshments_quantity: DataTypes.INTEGER,
    userRefreshments_total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userrefreshments',
  });
  return userrefreshments;
};
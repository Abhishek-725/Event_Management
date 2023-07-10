'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class venues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  venues.init({
    venue_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    venue_name: DataTypes.STRING,
    venue_address: DataTypes.STRING,
    venue_price: DataTypes.INTEGER,
    venue_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'venues',
  });
  return venues;
};
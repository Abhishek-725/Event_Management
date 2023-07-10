'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usereventdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usereventdetails.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    event_name: DataTypes.STRING,
    decoration_name: DataTypes.STRING,
    decoration_type: DataTypes.STRING,
    venue_name: DataTypes.STRING,
    venue_address: DataTypes.STRING,
    event_date: DataTypes.DATE,
    event_time: DataTypes.TIME,
    event_total: DataTypes.INTEGER,
    status:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usereventdetails',
  });
  return usereventdetails;
};
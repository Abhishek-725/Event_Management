'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usereventinfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usereventinfos.init({
    event_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    event_name: DataTypes.STRING,
    decoration_name: DataTypes.STRING,
    decoration_type: DataTypes.STRING,
    venue_name: DataTypes.STRING,
    venue_address: DataTypes.STRING,
    event_date: DataTypes.STRING,
    event_time: DataTypes.STRING,
    event_total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usereventinfos',
  });
  return usereventinfos;
};
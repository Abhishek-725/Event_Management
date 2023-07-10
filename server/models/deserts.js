'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deserts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  deserts.init({
    desert_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    desert_name: DataTypes.STRING,
    desert_description: DataTypes.STRING,
    desert_price: DataTypes.INTEGER,
    desert_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'deserts',
  });
  return deserts;
};
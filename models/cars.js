'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    
    static associate(models) {
      cars.belongsTo(models.sizes, {
        foreignKey: 'sizes_id'
      })
    }
  }
  cars.init({
    name: DataTypes.STRING,
    rent_per_day: DataTypes.INTEGER,
    sizes_id: DataTypes.INTEGER,
    photo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'cars',
    tableName: 'cars',
    paranoid: true
  });
  return cars;
};
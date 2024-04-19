'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sizes extends Model {
    
    static associate(models) {
      
    }
  }
  sizes.init({
    size_category: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sizes',
    tableName: 'sizes',
    paranoid: true
  });
  return sizes;
};
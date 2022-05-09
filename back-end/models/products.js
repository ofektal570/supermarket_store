'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    product_id: DataTypes.NUMBER,
    name: DataTypes.STRING,
    prev_price: DataTypes.DOUBLE,
    curr_price: DataTypes.DOUBLE,
    amount: DataTypes.NUMBER,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};
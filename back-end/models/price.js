'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  price.init({
    product_id: DataTypes.REAL,
    prices: DataTypes.ARRAY(DataTypes.DOUBLE),
    dates: DataTypes.ARRAY(DataTypes.DATE)
  }, {
    sequelize,
    modelName: 'price',
    // tableName: 'prices'
  });
  return price;
};
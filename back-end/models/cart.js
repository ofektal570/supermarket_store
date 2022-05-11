'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  cart.init({
    product_id: DataTypes.ARRAY(DataTypes.REAL),
    qty: DataTypes.ARRAY(DataTypes.REAL),
    delivery_option: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};
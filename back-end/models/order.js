'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
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
        updatedAt:undefined,
      };
      
    }
  }
  order.init({
    product_name: DataTypes.ARRAY(DataTypes.STRING),
    qty: DataTypes.ARRAY(DataTypes.REAL),
    total_price: DataTypes.ARRAY(DataTypes.DOUBLE),
    delivery_option: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};
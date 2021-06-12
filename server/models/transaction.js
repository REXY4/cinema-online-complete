'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, {
        as : "user",
        foreignKey : {
          name : "userId",
        }
      })

      Transaction.belongsTo(models.Film, {
        as : "films",
        foreignKey : {
          name : "filmId"
        }
      })
    }
  };
  Transaction.init({
    userId: DataTypes.INTEGER,
    filmId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    accountNumber: DataTypes.INTEGER,
    transferProof: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
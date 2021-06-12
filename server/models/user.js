'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Film,{
        as : "films",
        foreignKey : {
          name : "userId"
        }
      })

      User.hasOne(models.Transaction,{
        as : "transactions",
        foreignKey : {
          name : "userId"
        }
      })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
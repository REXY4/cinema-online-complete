'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Film.belongsTo(models.User,{
        as : "user",
        foreignKey : {
          name : "userId"
        }
      })
      
      Film.belongsToMany(models.Category,{
        as : "categories",
        through : {
          model : "CategoryFilms",
          as : "conjunction"
        }
      })

      Film.hasMany(models.Transaction,{
        as : "transactions",
        foreignKey : {
          name : "filmId"
        }
      })
    }
  };
  Film.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    filmUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};
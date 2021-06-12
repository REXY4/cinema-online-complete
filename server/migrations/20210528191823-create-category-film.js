'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CategoryFilms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : "Categories",
          as :"id"
        },
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
      },
      filmId: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : "Films",
          key : "id",
        },
        onDelete : "CASCADE",
        onUpdate : "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CategoryFilms');
  }
};
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : "Users",
          key : "id",
        },
        onDelete : "CASCADE",
        onUpdate : "CASCADE",
      },
      filmId: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : "Films",
          key : "id"
        },
        onDelete : "CASCADE",
        onUpdate : "CASCADE",
      },
      status: {
        type: Sequelize.STRING
      },
      accountNumber: {
        type: Sequelize.INTEGER
      },
      transferProof: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Transactions');
  }
};
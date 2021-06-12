
'use strict';
const bcrypt =  require("bcrypt");


const hashedPassword =async (password) =>{

  const salt = await bcrypt.genSalt(10);
  const psw = await bcrypt.hash(password, salt);
  return psw;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
   

     return queryInterface.bulkInsert('Users', [{
          email : 'anton4@gmail.com',
          password : await hashedPassword("anton1234"),
          fullName : "Admin Cinema Online",
          createdAt: new Date(),
          updatedAt: new Date(),
       }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {});
  }
};

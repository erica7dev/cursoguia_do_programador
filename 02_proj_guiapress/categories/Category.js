const Sequelize = require("sequelize");
const connection = require('../database/database');

const Category = connection.define('categories', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: { //versão do titulo de certa categoria que é usada na rota
    type: Sequelize.STRING,
    allowNull: false 
  }
});

//Category.sync({ force: true });  //comentada pra não rodar 2x

module.exports = Category;

const Sequelize = require('sequelize');
const connection = require('./database');

//nome da table
const Perguntas = connection.define('perguntas',{
  titulo:{
      type: Sequelize.STRING, //texto curto
      allowNull: false
  },
  descricao:{
      type: Sequelize.TEXT, //texto logo
      allowNull: false
  }
});

//force: false => se tabela já existir ele não recria
//sync => se não existir table ele cria
Perguntas.sync({force: false}).then(() => {});

module.exports = Perguntas;
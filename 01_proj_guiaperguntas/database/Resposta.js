const Sequelize = require("sequelize");
const connection = require("./database");

const Respostas = connection.define("respostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  perguntaId: {
    //as respostas correspondem a uma pgt.
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Respostas.sync({ force: false });

module.exports = Respostas;

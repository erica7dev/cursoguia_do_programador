const Sequelize = require("sequelize");
const connection = new Sequelize("guiapress", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00", //ajustando mysql de acordo com o fuso horário local
});

module.exports = connection;

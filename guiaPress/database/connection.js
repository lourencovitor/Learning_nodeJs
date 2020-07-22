const Sequelize = require("sequelize");

const connection = new Sequelize("guiapress", "root", "positivo20", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;

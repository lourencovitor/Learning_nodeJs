const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define("perguntas", {
  titulo: {
    type: Sequelize.STRING, // campo do tipo string
    allowNull: false, // impede campo de ser nullo
  },
  descricao: {
    type: Sequelize.TEXT, // campo do tipo text
    allowNull: false,
  },
});

Pergunta.sync({ force: false });

module.exports = Pergunta;

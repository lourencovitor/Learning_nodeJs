const { connection } = require("./config");
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: connection.host,
    user: connection.user,
    password: connection.password,
    database: connection.database,
  },
});

module.exports = knex;

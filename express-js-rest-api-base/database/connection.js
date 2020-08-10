const { connection } = require("../config");
var knex = require("knex")({
  client: "mysql2",
  connection: {
    host: connection.host,
    user: connection.user,
    password: connection.password,
    database: connection.database,
  },
});

module.exports = knex;

const database = require("./database");
const { innerJoin } = require("./database");

// INSERT
// const dados = [
//   { nome: "Cs Go", preco: 120.67 },
//   { nome: "GTA", preco: 200.65 },
//   { nome: "Pes 2021", preco: 170.67 },
// ];

// const res = database
//   .insert(dados)
//   .into("games")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// SELECT
// database
//   .select()
//   .table("games")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Nested Queries
// database
//   .insert({ nome: "Bombapet 2020", preco: 28.65 })
//   .into("games")
//   .then((res) => {
//     database
//       .select()
//       .table("games")
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// WHERE
// database
//   .select(["id", "preco"])
//   .where({ nome: "Good of war" })
//   .orWhere({ id: 1 })
//   .whereRaw("nome = 'Good of war' OR preco > 120.80")
//   .table("games")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// RAW
// database
//   .raw("select * from games")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// DELETED
// database
//   .where({ id: 3 })
//   .delete()
//   .table("games")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// UPDATE
// database
//   .where({ id: 4 })
//   .update({ preco: 190 })
//   .table("games")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Orderby
// database
//   .select()
//   .table("games")
//   .orderBy("nome", "desc")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Associated inserts
// database
//   .insert({
//     nome: "Rockstar",
//     game_id: 4,
//   })
//   .table("estudios")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// INNER_JOIN 1 para 1
// database
//   .select([
//     // "games.id",
//     // "estudios.id as estudio_id",
//     // "games.nome as game_nome",
//     // "estudios.nome as estudio_nome",
//     "games.*",
//     "estudios.nome as estudio_nome",
//   ])
//   .table("games")
//   .innerJoin("estudios", "estudios.game_id", "games.id")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// INNER_JOIN with WHERE
// database
//   .select([
//     // "games.id",
//     // "estudios.id as estudio_id",
//     // "games.nome as game_nome",
//     // "estudios.nome as estudio_nome",
//     "games.*",
//     "estudios.nome as estudio_nome",
//   ])
//   .table("games")
//   .innerJoin("estudios", "estudios.game_id", "games.id")
//   .where("games.id", 4)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// 1 para M
// database
//   .select(["games.*", "estudios.nome as estudio_nome"])
//   .table("games")
//   .innerJoin("estudios", "estudios.game_id", "games.id")
//   .then((res) => {
//     let game = {
//       id: res.id,
//       nome: "",
//       estudios: [],
//     };
//     game.id = res[0].id;
//     game.nome = res[0].nome;

//     res.forEach((estudio) => {
//       game.estudios.push({ nome: estudio.estudio_nome });
//     });

//     console.log(game);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// M para M
// database
//   .select([
//     "estudios.nome as estudio_nome",
//     "games.nome as game_nome",
//     "games.preco",
//   ])
//   .table("games_estudios")
//   .innerJoin("games", "games.id", "games_estudios.game_id")
//   .innerJoin("estudios", "estudios.id", "games_estudios.estudio_id")
//   //   .where("games.id", 4)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Transactions

async function teste_transaction() {
  try {
    await database.transaction(async (trans) => {
      await database.insert({ nome: "midnightclube" }).table("estudios");
      await database.insert({ nome: "Pyxeralia" }).table("estudios");
      await database.insert({ nome: "Mojang" }).table("estudios");
      await database.insert({ nome: "Gearbox" }).table("estudios");
    });
  } catch (error) {
    console.log(error);
  }
}

teste_transaction();

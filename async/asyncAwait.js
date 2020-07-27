function pegarId() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5);
    }, 1500);
  });
}

function buscarEmailNoBanco(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("vitor@teste.com.br");
    }, 2000);
  });
}

function enviarEmail(corpo, para) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let deuErro = true;
      if (!deuErro) {
        resolve({ time: 6, to: "vitor@teste.com.br" }); // Promessa OK!
      } else {
        reject("Fila cheia"); // Foi mal, eu falhei :(
      }
    }, 4000);
  });
}

function pegarUsuarios() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { name: "Vitor", lang: "JS" },
        { name: "Kaila", lang: "C#" },
        { name: "Daniel", lang: "Java" },
      ]);
    }, 3000);
  });
}

async function principal() {
  let id = await pegarId();
  let email = await buscarEmailNoBanco(id);
  try {
    await enviarEmail("Olá, como vai?", email);
    console.log("Email enviado com sucesso!");
  } catch (erro) {
    console.log(erro);
  }
}

principal();

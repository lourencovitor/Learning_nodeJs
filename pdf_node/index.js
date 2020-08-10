const pdf = require("html-pdf");
const ejs = require("ejs");

ejs.renderFile(
  "./meuarquivo.ejs",
  {
    nome: "Vitor",
    curso: "Formação Node.js",
  },
  (error, html) => {
    if (error) {
      console.log(error);
    } else {
      pdf.create(html, {}).toFile("./pdfs/meuPrimeiroPdf.pdf", (err, res) => {
        if (err) {
          console.log("Um erro aconteceu", err);
        } else {
          console.log(res);
        }
      });
    }
  }
);

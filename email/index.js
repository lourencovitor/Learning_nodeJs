const nodemailer = require("nodemailer");
const { user, pass } = require("./config");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 587,
  auth: {
    user, // {user: your email}
    pass, // {pass: your password}
  },
});

transporter
  .sendMail({
    from: `Vitor Silva <${user}>`,
    to: "raquelribeiroh354@gmail.com",
    subject: "Olá Raquel, aqui é o amor da sua vida, Te amo <3 ",
    text:
      "O único momento que não estou pensando em você é quando estou dormindo, porque aí eu não estou pensando, estou sonhando.",
    html: `
    <h1>Olá Raquel aqui é o Vitinho</h1>

    <strong>Sabia que eu te amo ?</strong>
    <h2>você poderia me dar um beijinho ?</h2>
    <h3>E pegar uma aguinha para mim ? :( </h3>
    `,
  })
  .then((message) => {
    console.log(message);
  })
  .catch((err) => console.log(err));

const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = "320f7a53-a051-4004-969a-3b9d9ec8f952";

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    res.status(200);
    res.json({ users });
  }
  async store(req, res) {
    const { name, email, password } = req.body;
    if (email === undefined) {
      res.status(400);
      return res.json({ error: "O e-mail é inválido" });
    }
    if (name === undefined) {
      res.status(400);
      return res.json({ error: "O nome é inválido" });
    }
    if (password === undefined) {
      res.status(400);
      return res.json({ error: "A senha é inválida" });
    }

    const emailExists = await User.findEmail(email);

    if (emailExists) {
      res.status(406);
      return res.json({ error: "Usuário já está cadastrado" });
    }

    await User.new(email, password, name);

    res.status(201);
    return res.send("Tudo OK!");
  }
  async show(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      res.status(200);
      res.json(user);
    } else {
      res.status(404);
      res.json({});
    }
  }
  async update(req, res) {
    const { email, role, name } = req.body;
    const { id } = req.params;
    const result = await User.update(id, email, name, role);
    if (result !== undefined) {
      if (result.status) {
        res.status(200);
        res.send("Tudo OK");
      } else {
        res.status(406);
        res.send(result.err);
      }
    } else {
      res.status(406);
      res.send("Ocorreu um erro no servidor");
    }
  }
  async destroy(req, res) {
    const { id } = req.params;
    const response = await User.delete(id);
    console.log(response);
    if (response.status) {
      res.status(200).send("Usuário deletado com sucesso");
    } else {
      res.status(406).send(response.err);
    }
  }
  async recoverPassword(req, res) {
    const { email } = req.body;
    const result = await PasswordToken.create(email);
    if (result.status) {
      res.status(200);
      res.send(`${result.token}`);
    } else {
      res.status(406);
      res.send(result.err);
    }
  }
  async changePassword(req, res) {
    const { token, password } = req.body;
    const isTokenValid = await PasswordToken.validate(token);
    if (isTokenValid.status) {
      await User.changePassword(
        password,
        isTokenValid.token.user_id,
        isTokenValid.token.token
      );
      res.status(200);
      res.send("Senha alterada");
    } else {
      res.status(406);
      res.send("Token invalido");
    }
  }
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = jwt.sign({ email: user.email, role: user.role }, secret);
        res.status(200);
        res.json({ token });
      } else {
        res.status(406);
        res.send("Senha incorreta");
      }
    } else {
      res.status(406);
      res.send("O usuario não existe");
    }
  }
}

module.exports = new UserController();

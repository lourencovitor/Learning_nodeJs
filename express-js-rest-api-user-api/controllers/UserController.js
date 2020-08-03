const User = require("../models/User");

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
}

module.exports = new UserController();

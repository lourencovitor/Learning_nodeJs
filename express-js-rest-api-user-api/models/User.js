const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User {
  async findAll() {
    try {
      const result = await knex
        .select(["id", "name", "email", "role"])
        .table("users");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async findById(id) {
    try {
      const result = await knex
        .select(["id", "name", "email", "role"])
        .table("users")
        .where({ id });
      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  async new(email, password, name) {
    try {
      const hash = await bcrypt.hash(password, 10);
      await knex
        .insert({ email, password: hash, name, role: 0 })
        .table("users");
    } catch (err) {
      console.log(err);
    }
  }
  async findEmail(email) {
    try {
      const result = await knex.select("*").from("users").where({ email });
      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async update(id, email, name, role) {
    let user = await this.findById(id);

    if (user != undefined) {
      let editUser = {};

      if (email != undefined) {
        if (email != user.email) {
          let result = await this.findEmail(email);
          if (result == false) {
            editUser.email = email;
          } else {
            return { status: false, err: "O e-mail já está cadastrado" };
          }
        }
      }

      if (name != undefined) {
        editUser.name = name;
      }

      if (role != undefined) {
        editUser.role = role;
      }

      try {
        await knex.update(editUser).where({ id }).table("users");
        return { status: true };
      } catch (err) {
        return { status: false, err: err };
      }
    } else {
      return { status: false, err: "O usuário não existe!" };
    }
  }
}

module.exports = new User();

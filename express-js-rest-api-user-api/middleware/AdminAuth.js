const jwt = require("jsonwebtoken");
const secret = "320f7a53-a051-4004-969a-3b9d9ec8f952";

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken !== undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];
    try {
      const decode = jwt.verify(token, secret);
      console.log(decode);
      if (decode.role === 1) {
        next();
      } else {
        res.status(403);
        res.send("Você não tem permissão para ver esses dados");
      }
    } catch (err) {
      res.status(403);
      res.send("Você não está autenticado");
    }
  } else {
    res.status(403);
    res.send("Você não está autenticado");
    return;
  }
};

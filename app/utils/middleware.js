require("dotenv").config();

const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
  try {
    if (req.headers.authorization) {

      const token = req.headers.authorization.split(" ")[1];
      if (token) {

        const payload = await jwt.verify(token, process.env.TOKEN_SECRET);
        if (payload) {

          req.user = payload;
          next();

        } else {
          res.status(400).json({ error: "Falha na verificação do token" });
        }
      } else {
        res.status(400).json({ error: "Header malformado." });
      }
    } else {
      res.status(400).json({ error: "Não existe autorização no header" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  middleware,
};
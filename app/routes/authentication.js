const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const UsersModel = require('../models/users');

const router = express.Router()

router.post("/", async (req, res) => {
  // #swagger.tags = ['Autenticação']
  // #swagger.summary = 'Realizar login'

  try {
    const user = await UsersModel.findOne({ email: req.body.email });
    if (user) {
      
      const result = await bcryptjs.compare(req.body.password, user.password);
      if (result) {

        const token = await jwt.sign({
          email: user.email, 
          user_id: user.id, 
          user_name: user.name 
        }, process.env.TOKEN_SECRET);

        res.status(200).json({ token });

      } else {
        res.status(400).json({ error: "Usuário e/ou senha inválidos" });
      }

    } else {
      res.status(400).json({ error: "Usuário e/ou senha inválidos" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/cadastrar', async (req, res) => {
  // #swagger.tags = ['Autenticação']
  // #swagger.summary = 'Realizar cadastro'

  try {
    const { name, email, password } = req.body;

    const userExists = await UsersModel.findOne({ email });
    if (userExists) {
      return res.status(422).send('Este usuário já existe!');
    }

    const salt = await bcryptjs.genSalt(10);  
    const hashPassword = await bcryptjs.hash(password, salt);

    const user = new UsersModel({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    const token = await jwt.sign({ email }, process.env.TOKEN_SECRET);
    res.json({ token });

  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;

const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsersModel = require('../models/users');

const router = express.Router()

router.put('/:id', async (req, res) => {  
  // #swagger.tags = ['Usuários']
  // #swagger.summary = 'Alterar uma usuário'

  try {
    const id = req.params.id;

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const updatedData = req.body;
    const options = {
      new: true,
    };

    await UsersModel.findByIdAndUpdate(
      id, updatedData, options
    );

    const token = await jwt.sign({
      email: updatedData.email, 
      user_name: updatedData.name,
      user_id: id, 
    }, process.env.TOKEN_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router

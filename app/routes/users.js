const express = require('express');
const bcrypt = require("bcryptjs");

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

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router

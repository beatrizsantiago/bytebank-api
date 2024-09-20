const express = require('express');

const TransactionsModel = require('../models/transactions');

const router = express.Router();

router.post('/', async (req, res) => {
  // #swagger.tags = ['Transações']
  // #swagger.summary = 'Criar uma transação'

  try {
    const { kind, value } = req.body;

    const data = new TransactionsModel({
      kind,
      value,
    });

    const newTransaction = await data.save();
    res.status(201).json(newTransaction);

  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get('/', async (req, res) => {
  // #swagger.tags = ['Transações']
  // #swagger.summary = 'Obter as transações'

  try{
    const list = await TransactionsModel.find();
    res.json(list);   

  } catch(error){
    res.status(400).json({ error: error });
  }
});

router.put('/:id', async (req, res) => {  
  // #swagger.tags = ['Transações']
  // #swagger.summary = 'Alterar uma transação'

  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = {
      new: true,
    };

    const result = await TransactionsModel.findByIdAndUpdate(
      id, updatedData, options
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.delete('/:id', async (req, res) => {  
  // #swagger.tags = ['Transações']
  // #swagger.summary = 'Deletar uma transação'

  try {
    const { id } = req.params;
    await TransactionsModel.findByIdAndDelete(id);

    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error });
  }
})

module.exports = router;

const express = require('express');

const TransactionsModel = require('../models/transactions');

const router = express.Router();

const verifyBalance = async () => {
  const result = await TransactionsModel.aggregate([
    {
      $group: {
        _id: null,
        totalValue: { $sum: "$value" }
      }
    }
  ]);

  const totalValue = result.length > 0 ? result[0].totalValue : 0;

  return totalValue;
};

router.post('/', async (req, res) => {
  // #swagger.tags = ['Transações']
  // #swagger.summary = 'Criar uma transação'

  try {
    const { kind, value } = req.body;

    const balance = await verifyBalance();

    if (kind !== 'DEPOSIT' && balance < value) {
      return res.status(400).json({ error: 'Saldo insuficiente' });
    }

    const amount = kind !== 'DEPOSIT' ? (value * -1) : value;

    const data = new TransactionsModel({
      kind,
      value: amount,
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
    let { page = 1, limit = 6 } = req.query;
  
    let filter = {};

    let query = TransactionsModel.find(filter).sort({ date: -1 });

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    query = query.skip(skip).limit(parseInt(limit, 10));
    
    const list = await query.exec();
    const count = await TransactionsModel.countDocuments(filter);
  
    res.json({
      data: list,
      totalPages: Math.ceil(count / parseInt(limit, 10)),
      currentPage: parseInt(page, 10)
    });
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

    const balance = await verifyBalance();

    if (updatedData.kind !== 'DEPOSIT' && balance < updatedData.value) {
      return res.status(400).json({ error: 'Saldo insuficiente' });
    }

    const amount = updatedData.kind !== 'DEPOSIT' ? (value * -1) : value;

    const data = await TransactionsModel.findByIdAndUpdate(
      id,
      {
        kind: updatedData.kind,
        value: amount,
      },
      options,
    );

    res.send(data);
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

    res.status(200).json({ message: 'Transação deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error });
  }
})

module.exports = router;

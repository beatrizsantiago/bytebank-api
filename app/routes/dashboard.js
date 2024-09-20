const express = require('express');

const TransactionsModel = require('../models/transactions');

const router = express.Router();

router.get('/', async (req, res) => {
  // #swagger.tags = ['Dashboard']
  // #swagger.summary = 'Obter dashboard'

  try{
    const result = await TransactionsModel.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: "$value" }
        }
      }
    ]);
    
    if (result.length > 0) {
      res.json({ totalValue: result[0].totalValue });
    } else {
      res.json({ totalValue: 0 });
    }

  } catch(error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
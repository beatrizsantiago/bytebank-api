const mTransactions = require('mongoose');

const transactionsSchema = new mTransactions.Schema({
  kind: {
    required: true,
    type: String,
    enum: ['DEPOSIT', 'TRANSFER'],
  },
  value: {
    required: true,
    type: Number,
  }
}, { versionKey: false })

module.exports = mTransactions.model('Transactions', transactionsSchema);

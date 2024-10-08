const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
  kind: {
    required: true,
    type: String,
    enum: ['DEPOSIT', 'TRANSFER'],
  },
  value: {
    required: true,
    type: Number,
  },
  date: {
    required: true,
    type: Date,
    default: Date.now,
  },
}, { versionKey: false })

module.exports = mongoose.model('Transactions', transactionsSchema);

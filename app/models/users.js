const mUsers = require('mongoose');

const usersSchema = new mUsers.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { versionKey: false })

module.exports = mUsers.model('Users', usersSchema);

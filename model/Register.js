const mongoose = require('mongoose')
const registerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },

  user_type: {
    type: String,
    default: 'user'
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('User', registerSchema)

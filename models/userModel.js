const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    default: 0
  },
  searchUrls: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'shortUrl'
    }],
    default: []
  }
})

module.exports = mongoose.model('User', UserSchema)
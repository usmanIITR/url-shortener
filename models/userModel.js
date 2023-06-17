const mongoose = require('mongoose')
const shortId = require('shortid')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    default: shortId.generate
  },
  password: {
    type: String,
    required: true,
    default: 0
  },
  urls: [
    {
        full: {
            type: String,
            required: true
          },
          short: {
            type: String,
            required: true,
            default: shortId.generate
          },
          clicks: {
            type: Number,
            required: true,
            default: 0
          }
    }
  ]
})

module.exports = mongoose.model('User', UserSchema)
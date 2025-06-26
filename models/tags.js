const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: 'Required'
  },
  name: {
    type: String
  }
})

const TagModel = mongoose.model('tag', TagSchema)

module.exports = {
  TagModel
}

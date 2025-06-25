const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: String,
    required: true
  }
})

const NoteModel = mongoose.model('note', NoteSchema)

module.exports = {
  NoteModel
}

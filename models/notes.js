const mongoose = require('mongoose')
const { TagModel } = require('./tags')

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

NoteSchema.post('save', function async(doc, next) {
  const tags = doc.tags
  TagModel.find({}).then((existingTags) => {
    const existingTagIds = existingTags.map((tag) => tag._id)
    const newTags = tags.filter((tag) => !existingTagIds.includes(tag))
    TagModel.insertMany(newTags.map((tag) => ({ _id: tag, count: 1 })))
  })

  next()
})

const NoteModel = mongoose.model('note', NoteSchema)

module.exports = {
  NoteModel
}

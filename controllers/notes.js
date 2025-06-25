const { NoteModel } = require('../models/notes.js')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

const getNotes = async (req, res) => {
  const notes = await NoteModel.find({ isArchived: false }).sort({
    createdAt: -1
  })
  return res.json(notes)
}

const createNote = async (req, res) => {
  const note = req.body
  const date = moment().format('DD/MM/YYYY')
  const newNote = new NoteModel({ id: uuidv4(), createdAt: date, ...note })
  try {
    const resp = await newNote.save()
    return res.json(resp)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  getNotes,
  createNote
}

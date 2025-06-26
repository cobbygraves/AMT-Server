const { NoteModel } = require('../models/notes.js')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

const getNotes = async (req, res) => {
  const notes = await NoteModel.find({}).sort({
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

const archiveNote = async (req, res) => {
  const noteId = req.params.id
  const { isArchived } = req.query

  try {
    const resp = await NoteModel.updateOne({ id: noteId }, { isArchived })
    return res.json(resp)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getSingleNote = async (req, res) => {
  const noteId = req.params.id
  const note = await NoteModel.findOne({ id: noteId })
  return res.json(note)
}

const updateNote = async (req, res) => {
  const note = req.body
  const id = req.params.id
  try {
    const resp = await NoteModel.updateOne({ id: id }, note)
    return res.json(resp)
  } catch (error) {
    res.status(400).json(error)
  }
}

const deleteNote = async (req, res) => {
  const noteId = req.params.id
  try {
    const resp = await NoteModel.deleteOne({ id: noteId })
    return res.json(resp)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  getNotes,
  createNote,
  archiveNote,
  getSingleNote,
  updateNote,
  deleteNote
}

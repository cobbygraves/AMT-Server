const express = require('express')
const {
  getNotes,
  createNote,
  archiveNote,
  getSingleNote,
  updateNote,
  deleteNote,
  getArchivedNotes
} = require('../controllers/notes')

const router = express.Router()
router.get('/', getNotes)
router.post('/create', createNote)
router.get('/archived', getArchivedNotes)
router.get('/:id/archive', archiveNote)
router.get('/:id', getSingleNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

module.exports = router

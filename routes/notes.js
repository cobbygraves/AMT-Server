const express = require('express')
const {
  getNotes,
  createNote,
  archiveNote,
  getSingleNote,
  updateNote,
  deleteNote,
  getArchivedNotes,
  getTagNotes,
  searchNotes
} = require('../controllers/notes')

const router = express.Router()
router.get('/', getNotes)
router.post('/create', createNote)
router.get('/archived', getArchivedNotes)
router.get('/search', searchNotes)
router.get('/:id/archive', archiveNote)
router.get('/:id', getSingleNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)
router.get('/tags/:tag', getTagNotes)

module.exports = router

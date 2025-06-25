const express = require('express')
const {
  getNotes,
  createNote,
  archiveNote,
  getSingleNote,
  updateNote
} = require('../controllers/notes')

const router = express.Router()
router.get('/', getNotes)
router.post('/create', createNote)
router.get('/:id/archive', archiveNote)
router.get('/:id', getSingleNote)
router.put('/:id', updateNote)

module.exports = router

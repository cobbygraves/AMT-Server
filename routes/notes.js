const express = require('express')
const { getNotes, createNote } = require('../controllers/notes')

const router = express.Router()
router.get('/', getNotes)
router.post('/create', createNote)

module.exports = router

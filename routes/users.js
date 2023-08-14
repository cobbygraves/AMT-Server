const express = require('express')
const {
  login,

  register
} = require('../controllers/users')
const upload = require('../utils/uploadImage')

const router = express.Router()

router.post('/login', login)

router.post('/register', register)

module.exports = router

const express = require('express')
const router = express.Router()
const { register, login, profile } = require('../controllers/auth')
const { authMiddelware } = require('../../src/middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authMiddelware(['superadmin', 'admin', 'user']), profile)

module.exports = router
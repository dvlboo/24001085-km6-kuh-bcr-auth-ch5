const express = require('express')
const router = express.Router()
const { superLogin, editRoles, getUsers, delUser } = require('../controllers/auth')
const { authMiddelware } = require('../../src/middleware/auth')

router.post('/login', superLogin)

router
  .route('/')
  .get(authMiddelware('superadmin'), getUsers)
  .put(authMiddelware('superadmin'), editRoles)

router
  .route('/:id')
  .delete(authMiddelware('superadmin'), delUser)

module.exports = router
const express = require('express')
const router = express.Router()

const { getSizes, getSize, createSize, updateSize, deleteSize } = require('../controllers/sizes')
const { authMiddelware } = require('../../src/middleware/auth')

router
  .route('/')
  .get(authMiddelware(['superadmin', 'admin', 'user']), getSizes)
  .post(authMiddelware(['superadmin', 'admin']) ,createSize)

router
  .route('/:id')
  .get(authMiddelware(['superadmin', 'admin', 'user']) ,getSize)
  .put(authMiddelware(['superadmin', 'admin']) ,updateSize)
  .delete(authMiddelware('superadmin') ,deleteSize)

module.exports = router
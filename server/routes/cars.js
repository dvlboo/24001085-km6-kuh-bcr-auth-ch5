const express = require('express')
const router = express.Router()

const { getCars, getCar, createCar, updateCar, deleteCar } = require('../controllers/cars')
const { authMiddelware } = require('../../src/middleware/auth')

router
  .route('/')
  .get(authMiddelware(['superadmin', 'admin', 'user']), getCars)
  .post(authMiddelware('superadmin', 'admin'), createCar)

router
  .route('/:id')
  .get(authMiddelware(['superadmin', 'admin', 'user']), getCar)
  .put(authMiddelware(['superadmin', 'admin']), updateCar)
  .delete(authMiddelware('superadmin'), deleteCar)

module.exports = router
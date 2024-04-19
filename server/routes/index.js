const express = require("express")
const router = express.Router()

const auth = require('./auth')
const superadmin = require('./superadmin')
const sizes = require('./sizes')
const cars = require('./cars')

router.use('/auth', auth)
router.use('/superadmin', superadmin)
router.use('/sizes', sizes)
router.use('/cars', cars)

module.exports = router
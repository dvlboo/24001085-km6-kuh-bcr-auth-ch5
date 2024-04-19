const express = require("express");
const router = express.Router();
const auth = require('./auth')
const superadmin = require('./superadmin')

router.use("/auth", auth)
router.use("/superadmin", superadmin)

module.exports = router;
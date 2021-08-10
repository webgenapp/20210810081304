const express = require('express')
const router = express.Router()

const aasRouter = require('./aas')
router.use('/aas', aasRouter)

const usersRouter = require('./users')
router.use('/users', usersRouter)

module.exports = router

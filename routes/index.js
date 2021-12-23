const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const record = require('./modules/record')
const users = require('./modules/users')

router.use('/users', users)
router.use('/records', authenticator, record)
router.use('/', authenticator, home)

module.exports = router
const express = require('express')
const router = express.Router()

const v1Routing = require('./v1/index')

router.use('/v1',v1Routing)

module.exports = router
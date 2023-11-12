const express = require('express')
const router = express.Router()

const UserController = require('../../controllers/user-contorller')

router.post('/signup',UserController.create)
router.post('/signin',UserController.signIn)

module.exports = router
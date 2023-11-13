const express = require('express')
const router = express.Router()

const UserController = require('../../controllers/user-contorller')

const {AuthValidators} = require('../../middleware/index')

router.post('/signup',AuthValidators.validationAuth,UserController.create)
router.post('/signin',AuthValidators.validationAuth,UserController.signIn)
router.get('/isAuth',UserController.isAuthenticated)
router.get('/verifyEmail',UserController.verifyEmail)

module.exports = router
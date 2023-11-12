const UserService = require('../services/user-service')
const userService = new UserService()
const create = async (req,res)=>{
  try {
    const user = await userService.create({
      email : req.body.email,
      password: req.body.password
    })
    return res.status(201).json({
      data: user,
      message: 'Successfully created a user',
      success: true,
      err: {}
    })
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: 'Cannot create a user',
      success: false,
      err: error
    })
  }
}

const getById = async (req,res)=>{
  try {
    const user = await userService.getById(req.params.id)
    return res.status(201).json({
      data: user,
      message: 'Successfully created a user',
      success: true,
      err: {}
    })
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: 'Cannot create a user',
      success: false,
      err: error
    })
  }
}

module.exports = {
  create,getById
}
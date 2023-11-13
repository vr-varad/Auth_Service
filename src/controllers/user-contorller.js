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
    console.log(error)
    return res.status(500).json({
      data: {},
      message: 'Cannot create a user',
      success: false,
      err: error
    })
  }
}

const signIn = async (req,res)=>{
  try {
    const response = await userService.signIn(req.body.email, req.body.password)
    return res.status(201).json({
      data: response,
      message: 'Successfully sign in',
      success: true,
      err: {}
    })
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: 'Cannot Sign In',
      success: false,
      err: error
    })
  }
}

const  isAuthenticated = async (req,res)=>{
  try {
    const token = req.rawHeaders[1]
    const response = await userService.isAuthenticated(token)
    console.log(response)
    return res.status(201).json({
      data: response,
      message: 'Successfully authenticated',
      success: true,
      err: {}
    })
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: 'Cannot authenticate',
      success: false,
      err: error
    })
  }
}

const  isAdmin = async (req,res)=>{
  try {
    const response = await userService.isAdmin(req.body.id)
    return res.status(201).json({
      data: response,
      message: 'admin/notadmin',
      success: true,
      err: {}
    })
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: 'Not a user',
      success: false,
      err: error
    })
  }
}



module.exports = {
  create,signIn,isAuthenticated,isAdmin
}
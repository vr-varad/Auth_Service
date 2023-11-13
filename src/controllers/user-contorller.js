const UserService = require('../services/user-service')
const userService = new UserService()
const nodemailer = require("nodemailer");
const {App_password} = require('../config/serverConfig')


const create = async (req,res)=>{
  try {
    const user = await userService.create({
      email : req.body.email,
      password: req.body.password
    })
    // const info = verifyEmail(req.body.email)
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
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: "varadgupta21@gmail.com",
    pass: `${App_password}`,
  },
});

async function verifyEmail(email){
  try {
    const info = await transporter.sendMail({
    from: '"Varad Gupta" <varadgupta21@gmail.com>', 
    to: `${email}`, 
    subject: "I am from server",
    text: "Hello world?", 
    html: "<b>Hello world?</b>", 
    })
    return info
  } catch (error) {
    return {
      error: "cannot send a email"
    }
  }
}

module.exports = {
  create,signIn,isAuthenticated,verifyEmail
}
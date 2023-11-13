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
      message: 'Cannot create a user',
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
      message: 'Cannot create a user',
      success: false,
      err: error
    })
  }
}
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "varadgupta21@gmail.com",
    pass: `${App_password}`,
  },
});

const verifyEmail = async (req,res)=>{
  try {
    const email = req.body['email']
    const info = await transporter.sendMail({
    from: '"Varad Gupta" <varadgupta21@gmail.com>', 
    to: `${email}`, 
    subject: "Hello ✔",
    text: "Hello world?", 
    html: "<b>Hello world?</b>", 
    })
    return res.status(201).json({
      data: {email: 'sent'},
      message: 'Successfully authenticated',
      success: true,
      err: {}
    })
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: 'Cannot send a mail',
      success: false,
      err: error
    })
  }
}

module.exports = {
  create,signIn,isAuthenticated,verifyEmail
}
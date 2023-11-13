
const nodemailer = require("nodemailer");
const {App_password} = require('../config/serverConfig')

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
  verifyEmail
}
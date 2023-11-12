const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  Port: process.env.Port,
  JWT_KEY: process.env.JWT_KEY
}
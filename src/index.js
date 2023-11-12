const express = require('express')
const {Port} = require('./config/serverConfig')
const bodyParser = require('body-parser')

const apiRoutes  = require('./routes/index')

const UserService = require('./services/user-service')

const app = express()

const prepareAndStartServer  = ()=>{
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use('/api',apiRoutes)

  app.listen(Port,()=>{
    console.log(`Server Started on port ${Port}`)
    const userService = new UserService()
    // const token = userService.createToken({email :"varad@gmail", id: 1})
    // console.log(token)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhcmFkQGdtYWlsIiwiaWQiOjEsImlhdCI6MTY5OTc4NDcwMywiZXhwIjoxNjk5Nzg4MzAzfQ.mCyG3yf0q8dYlgmVCpKT8mmczWM6I7txBamfOqzIt-g"
    const user = userService.verifyToken(token)
    console.log(user)
  })
}

prepareAndStartServer()
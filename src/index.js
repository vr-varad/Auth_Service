const express = require('express')
const {Port} = require('./config/serverConfig')
const bodyParser = require('body-parser')

const apiRoutes  = require('./routes/index')


const app = express()

const prepareAndStartServer  = ()=>{
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use('/api',apiRoutes)

  app.listen(Port,()=>{
    console.log(`Server Started on port ${Port}`)
  })
}

prepareAndStartServer()
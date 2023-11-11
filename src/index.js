const express = require('express')
const {Port} = require('./config/serverConfig')

const app = express()

const prepareAndStartServer  = ()=>{
  app.listen(Port,()=>{
    console.log(`Server Started on port ${Port}`)
  })
}

prepareAndStartServer()
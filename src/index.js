const express = require('express')
const {Port} = require('./config/serverConfig')
const bodyParser = require('body-parser')

const apiRoutes  = require('./routes/index')
const {DB_SYNC} = require('./config/serverConfig')

const app = express()

const prepareAndStartServer  =  ()=>{
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use('/api',apiRoutes)

  app.listen(Port,async ()=>{
    console.log(`Server Started on port ${Port}`)
    if(DB_SYNC){
      db.sequelize.sync({alter: true})
    }

    
  })
}

prepareAndStartServer()
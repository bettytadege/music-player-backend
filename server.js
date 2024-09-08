// import app from './app'
const app=require('./app')
 const dotenv =require('dotenv')
 dotenv.config({path:'./.env'})
 
 const port=process.env.PORT || 6000
  app.listen(port,()=>{
    console.log(`server is running ${port}....`)
 })
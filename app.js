const express=require ('express')
const morgan =require('morgan')
const dotenv =require('dotenv')
const playlistRoute=require('./routes/playlistRoute')
const mostListenedMusic=require('./routes/mostListenedMusic')
const trackOfTheWeekRoute=require('./routes/trackOfTheWeekRoute')
const connectDB=require('./dbConnection')
const app=express()
// app.use(express.json())
if(process.env.NODE_ENV === 'development'){

    app.use(morgan('dev'))
}

connectDB()
app.use(express.json())

app.use('/api/v1/playlist-for-you',playlistRoute)
app.use('/api/v1/most-listened',mostListenedMusic)
app.use('/api/v1/track-of-the-week',trackOfTheWeekRoute)



module.exports=app
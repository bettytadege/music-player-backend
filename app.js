const express=require ('express')
const morgan =require('morgan')
const dotenv =require('dotenv')
const playlistRoute=require('./routes/playlistRoute')
const mostListenedMusic=require('./routes/mostListenedMusic')
const trackOfTheWeekRoute=require('./routes/trackOfTheWeekRoute')
const conDB=require('./config/DB')
const cors=require('cors')
const AppError = require('./ErrorHandler/appError')
const upload=require('./config/multer')
const app=express()
const path = require('path')
app.use(cors())
if(process.env.NODE_ENV === 'development'){

    app.use(morgan('dev'))
}

conDB()
app.use(express.json())
app.get('/',(req,res,next)=>{
    res.send('hello from server')
    next()
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileUrl = `http://localhost:${PORT}/uploads/photos/${req.file.filename}`;

  res.json({ fileUrl, message: 'File uploaded successfully' });
});

app.use('/api/v1/playlist-for-you',playlistRoute)
app.use('/api/v1/most-listened',mostListenedMusic)
app.use('/api/v1/track-of-the-week',trackOfTheWeekRoute)



module.exports=app
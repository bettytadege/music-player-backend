const express=require ('express')
const morgan =require('morgan')
const dotenv =require('dotenv')
const playlistRoute=require('./routes/playlistRoute')
const mostListenedMusic=require('./routes/mostListenedMusic')
const trackOfTheWeekRoute=require('./routes/trackOfTheWeekRoute')
const userRoutes=require('./routes/userRoutes')
const conDB=require('./config/DB')
const cors=require('cors')
const path = require('path')
const upload=require('./config/multer')

const AppError = require('./ErrorHandler/appError')
const app=express()
app.use(cors())
if(process.env.NODE_ENV === 'development'){

    app.use(morgan('dev'))
}
//  app.use('*',(req,res,next)=>{
//     next(new AppError('not found',404))
//  })

conDB()
app.use(express.json())
app.get('/', (req, res) => {
  res.json({
    user: {
      "GET /api/users": "Get all users",
      "POST /api/user/register": "Register a new user",
      "POST /api/login": "User login",
      "POST /api/forgot": "Forgot password"
    },
    playlist: {
      "GET /api/v1/playlist-for-you": "Get all playlists",
      "POST /api/v1/playlist-for-you": "Create a playlist",
      "GET /api/v1/playlist-for-you/:id": "Get a playlist by ID",
      "PUT /api/v1/playlist-for-you/:id": "Update a playlist",
      "DELETE /api/playlists/:id": "Delete a playlist"
    },
    most_listened: {
      "GET /api/v1/most-listened": "Get all most listened songs",
      "GET /api/v1/most-listened/:id": "Get a most listened song by ID",
      "PUT /api/v1/most-listened/:id": "Update a most listened song",
      "DELETE /api/v1/most-listened/:id": "Delete a most listened song"
    },
    track_of_the_week: {
      "GET /api/v1/track-of-the-week": "Get all track of the week",
      "POST /api/v1/track-of-the-week": "Create a track of the week",
      "GET /api/v1/track-of-the-week/:id": "Get track of the week by ID",
      "PUT /api/v1/track-of-the-week/:id": "Update track of the week",
      "DELETE /api/v1/track-of-the-week/:id": "Delete track of the week"
    }
  });
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileUrl = `http://localhost:${PORT}/uploads/photos/${req.file.filename}`;

  res.json({ fileUrl, message: 'File uploaded successfully' });
});

app.use('/api/users',userRoutes)
app.use('/api/v1/playlist-for-you',playlistRoute)
app.use('/api/v1/most-listened',mostListenedMusic)
app.use('/api/v1/track-of-the-week',trackOfTheWeekRoute)



module.exports=app
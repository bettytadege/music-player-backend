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
  res.send(`
    <h1>🎵 Music Player API</h1>
    <
    <h3>Available Endpoints:</h3>
    <ul>
    // user
    <li>GET /api/users - Get all users</li>
    <li>POST /api/user/register - Get all users</li>
    <li>POST /api/login - Get all users</li>
    <li>POST /api/gorget - Get all users</li>
    // playlist
      <li>GET /api/v1/playlist-for-you - Get all playlists</li>
      <li>POST /api/v1/playlist-for-you - Create a playlist</li>
      <li>GET /api/v1/playlist-for-you/:id - Get a playlist by ID</li>
      <li>PUT /api/v1/playlist-for-you/:id - Update a playlist</li>
      <li>DELETE /api/playlists/:id - Delete a playlist</li>
    // most listend
       <li>GET /api/v1/most-listened' - get allmost listend song</li>

      <li>GET /api/v1/most-listened'/:id - Get a most listend song by ID</li>
      <li>PUT /api/v1/most-listened'/:id - Update a most listend song</li>
      <li>DELETE /api/v1/most-listened'/:id - Delete  most listend song</li>

      // track of the week
      <li>GET //api/v1/track-of-the-week - Get all track of the week</li>
      <li>POST /api/v1/track-of-the-week- Create  track of the week</li>
      <li>GET /api/v1/track-of-the-week/:id - Get track of the week by ID</li>
      <li>PUT /api/v1/track-of-the-week/:id - Update track of the week</li>
      <li>DELETE /api/v1/track-of-the-week/:id - Delete  track of the week</li>
    </ul>
    
  `);
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
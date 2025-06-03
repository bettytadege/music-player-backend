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
app.get('/', (req, res) => {
  res.send(`
    <h1>🎵 Music Player API</h1>
    <
    <h3>Available Endpoints:</h3>
    <ul>
      <li>GET /api/playlists - Get all playlists</li>
      <li>POST /api/playlists - Create a playlist</li>
      <li>GET /api/playlists/:id - Get a playlist by ID</li>
      <li>PUT /api/playlists/:id - Update a playlist</li>
      <li>DELETE /api/playlists/:id - Delete a playlist</li>
    </ul>
    <p>Hosted on Render: <a href="https://musicplayer-backend-fduc.onrender.com" target="_blank">Go to API</a></p>
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

app.use('/api/v1/playlist-for-you',playlistRoute)
app.use('/api/v1/most-listened',mostListenedMusic)
app.use('/api/v1/track-of-the-week',trackOfTheWeekRoute)



module.exports=app
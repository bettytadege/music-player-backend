const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });




const playlistSchema = new mongoose.Schema({
  albumtitle: {
    type: String,
    require: [true, "album title is required"],
  },
  mix: {
    type: String,
  },
  track: [
    {
      trackNumber: Number,
      title: String,
      duration: Number,
      track_url: String,
    }
  ],
  poster_url: {
    type: String,
    require: [true, "poster url is required"],
  },
  format: {
    type: String,
    default:'mp3'
  },
  listened: {
    type: Number,
  },
  liked: {
    type: Boolean,
    default: false
  },
 
  number_of_track: {
    type: Number,
    
  },
  name_of_track:{
    type:String,
 }
});

playlistSchema.set('toJSON', {
  virtuals: true
});

const playlistModel = mongoose.model("playlist", playlistSchema);

module.exports = playlistModel;

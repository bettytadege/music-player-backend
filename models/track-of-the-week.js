const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const trackSchema = new mongoose.Schema({
  albumtitle: {
    type: String,
    require: [true, "album title is required"],
  },
  mix: {
    type: String,
  },
  albumID:{
    type:mongoose.Schema.objectId,
    ref:'playlist',
    required:true
  },
  track_url: String,
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
  
});

const trackOfTheWeekModel = mongoose.model("track", trackSchema);
module.exports = trackOfTheWeekModel;

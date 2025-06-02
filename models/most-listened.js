const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// const DB = process.env.DATABASE;
// mongoose
//   .connect(DB)
//   .then(() => {
//     console.log("database connected successfully");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const mostListenedSchema = new mongoose.Schema({
  albumtitle: {
    type: String,
    require: [true, "album title is required"],
  },
  mix: {
    type: String,
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

const mostListenedModel = mongoose.model("mostListened", mostListenedSchema);
module.exports = mostListenedModel;


const playlistModel = require("../models/playlistModel");

exports.getAllTrack = async (req, res) => {
  const filter={}
 
  try {
    const albums = await playlistModel.find(); // Find all albums
    for (let index = 0; index < albums.length; index++) {
      const album = albums[index];
      // console.log("album tracks");
      // console.log(album.track);
  
      // Generate random number 
      const randomNumber = Math.floor(Math.random() * album.track.length); 
   
      const randomTrack = album.track[randomNumber];
  
     
      album.track = [randomTrack];
      // console.log("random album track selected");
      // console.log(album);
    }
  
   
    res.status(200).json({
      status: "success",
      result: albums.length,
      albums, 
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
  
};
exports.getOneWeekTrack = async (req, res) => {
  try {
   console.log(req.params.id)
    const track = await playlistModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        track,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.createWeekTrack= async (req, res) => {
  try {
   // console.log(req.body)
    const newWeekOfTrack= await playlistModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newWeekOfTrack,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.updateWeekTrack= async(req, res) => {
   try {
      // console.log(req.body)
       const  newWeekOfTrack= await playlistModel.findByIdAndUpdate(req.params.id , req.body,{
         new:true , runValidators:true
       });
       res.status(201).json({
         status: "success",
         data: {
             newWeekOfTrack,
         },
       });
     } catch (error) {
       res.status(400).json({
         status: "failed",
         message: error,
       });
     }
};
exports.deleteWeekOfTrack= async(req, res) => {
   try {
      // console.log(req.body)
        await playlistModel.findByIdAndDelete(req.params.id )
       res.status(201).json({
         status: "success",
         
       });
     } catch (error) {
       res.status(400).json({
         status: "failed",
         message: error,
       });
     }
};

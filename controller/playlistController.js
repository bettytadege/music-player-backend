const { status } = require("init");
const playlistModel = require("../models/playlistModel");

exports.getAllPlaylist = async (req, res) => {
  try {
    const playlist = await playlistModel.find();
    res.status(200).json({
      status: "success",
      result:playlist.length,
      playlist: {
        playlist,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
exports.getOnePlaylist = async (req, res) => {
  try {
   console.log(req.params.id)
    const playlist = await playlistModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      playlist: {
        playlist,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.createPlaylist = async (req, res) => {
  try {
   // console.log(req.body)
    const newPlaylist = await playlistModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newPlaylist,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.updatePlaylist = async(req, res) => {
   try {
      // console.log(req.body)
       const newPlaylist = await playlistModel.findByIdAndUpdate(req.params.id , req.body,{
         new:true , runValidators:true
       });
       res.status(201).json({
         status: "success",
         data: {
           newPlaylist,
         },
       });
     } catch (error) {
       res.status(400).json({
         status: "failed",
         message: error,
       });
     }
};
exports.deletePlaylist = async(req, res) => {
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

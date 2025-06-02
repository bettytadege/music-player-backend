const { status } = require("init");
const playlistModel = require("../models/playlistModel");
const catchAsync = require("../ErrorHandler/catchAsync");
const AppError = require("../ErrorHandler/appError");

exports.getAllPlaylist =  catchAsync(async (req, res,next) => {
  const playlist = await playlistModel.find();
  if(playlist.length == 0){
return next(new AppError('playlist not found',404))
  }
    res.status(200).json({
      status: "success",
      result: playlist.length,
      playlist,
    });});
  
exports.getOnePlaylist = catchAsync(async (req, res,next) => {

  //  console.log(req.params)
   const playListId=req.params.id
  const playlist = await playlistModel.findById(playListId);
    // console.log(playlist)
    if(!playlist){
      return next(new AppError('playlist not found',400))
    }
    res.status(200).json({
      status: "success",
      playlist: [playlist],
        });


}      );

exports.createPlaylist = catchAsync(async (req, res) => {
 
   // console.log(req.body)
    const newPlaylist = await playlistModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newPlaylist,
      },
    });
  } );

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

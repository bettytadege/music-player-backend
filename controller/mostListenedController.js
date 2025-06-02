
const AppError = require("../ErrorHandler/appError");
const catchAsync = require("../ErrorHandler/catchAsync");
const playlistModel = require("../models/playlistModel");

exports.getAllListenedSong = catchAsync(async (req, res,next) => {
  
 
    const listened = await playlistModel
      .find({ listened: { $gt: 10 } })
      .sort({ listened: -1 });

      if(listened.length == 0){
        return next(new AppError('no listen song found',400))
      }
    res.status(200).json({
      status: "success",
      result: listened.length,
      listened,
    });
  
  
});

exports.getOneListenedSong = catchAsync( async (req, res) => {

   const ListenSongId=(req.params.id)
    const ListendSong = await playlistModel.findById(ListenSongId);
    if(!ListendSong){
      return next(new AppError('no listen song found with that id',400))
    }
    res.status(200).json({
      status: "success",
      ListendSong
    });
  
});

// exports.createMostListened=  catchAsync(async (req, res) => {
    
//     const newMostListened= await playlistModel.create(req.body);
//     res.status(201).json({
//       status: "success",
//       data: {
//         newMostListened,
//       },
//     });

// });

exports.updateMostListened= catchAsync( async(req, res) => {
   
      // console.log(req.body)
       const newMostListened= await playlistModel.findByIdAndUpdate(req.params.id , req.body,{
         new:true , runValidators:true
       });
       res.status(201).json({
         status: "success",
         data: {
            newMostListened,
         },
       });
    
});
exports.deleteMostListened= catchAsync( async(req, res) => {
  // console.log(req.id)
       const listenedSongId=req.params.id 
      const listenedSong=await playlistModel.findById(listenedSongId)
   if(!listenedSong){
    return next(new AppError('no listen song found with that id',400))
  }
      // console.log(req.body)
        await playlistModel.findByIdAndDelete()
       res.status(201).json({
         status: "success",
         
       });
    
});

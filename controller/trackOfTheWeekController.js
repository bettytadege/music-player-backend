
const trackModel = require("../models/track-of-the-week");

exports.getAllTrack = async (req, res) => {
  try {
    const track = await trackModel.find();
    res.status(200).json({
      status: "success",
      result:track.length,
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
exports.getOneWeekTrack = async (req, res) => {
  try {
   console.log(req.params.id)
    const track = await trackModel.findById(req.params.id);
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
    const newWeekOfTrack= await trackModel.create(req.body);
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
       const  newWeekOfTrack= await trackModel.findByIdAndUpdate(req.params.id , req.body,{
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
        await trackModel.findByIdAndDelete(req.params.id )
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

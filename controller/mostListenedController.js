
const mostListenedModel = require("../models/most-listened");

exports.getAllListenedSong = async (req, res) => {
  try {
    const listened = await mostListenedModel.find();
    res.status(200).json({
      status: "success",
      result:listened.length,
      data: {
        listened,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
exports.getOneListenedSong = async (req, res) => {
  try {
   console.log(req.params.id)
    const song = await mostListenedModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        song,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.createMostListened= async (req, res) => {
  try {
   // console.log(req.body)
    const newMostListened= await mostListenedModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newMostListened,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.updateMostListened= async(req, res) => {
   try {
      // console.log(req.body)
       const newMostListened= await mostListenedModel.findByIdAndUpdate(req.params.id , req.body,{
         new:true , runValidators:true
       });
       res.status(201).json({
         status: "success",
         data: {
            newMostListened,
         },
       });
     } catch (error) {
       res.status(400).json({
         status: "failed",
         message: error,
       });
     }
};
exports.deleteMostListened= async(req, res) => {
   try {
      // console.log(req.body)
        await mostListenedModel.findByIdAndDelete(req.params.id )
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

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });


const DB = process.env.DATABASE;


const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Database connected successfully');
  } catch (err) {
    console.error( err);
    
  }
};

module.exports = connectDB;


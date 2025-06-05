const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });


const DB = process.env.DATABASE;
// const DB='mongodb+srv://bettytadege13:0vHrNliEtveSI7QX@cluster0.5spqy6j.mongodb.net/song?retryWrites=true&w=majority&appName=Cluster0'



const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Database connected successfully');
  } catch (err) {
    console.log('🐦‍🔥🐦‍🔥')
    console.error( err);

    
  }
};

module.exports = connectDB;


const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.MONGO_STRING)
const mongoURI = "mongodb+srv://kistechnologyorg:lo3UjC9U7o4E0LSh@cluster0.hkfmchr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbConnect = async () => {
  await mongoose.connect(mongoURI);
  console.log(mongoURI)
  console.log("connecting Successfully");
};

module.exports = { dbConnect };

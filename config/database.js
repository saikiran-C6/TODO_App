// import dotenv file to access the database
require('dotenv').config()

// import mongoose
const mongoose = require('mongoose');

// export connectMongoose to access to database
exports.connectMonggose =()=>{
  mongoose.connect(process.env.DATABASE_URL,
  {
      useNewUrlParser: true
  })
  .then((e)=>console.log("Connected to Mongodb Database..."))
  .catch((e)=>console.log("Error connecting Database"))
}
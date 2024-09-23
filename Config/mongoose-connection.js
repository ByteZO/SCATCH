const mongoose = require("mongoose");
const Config = require("config");
const dbug = require("debug")("devlopment:mongoose");

mongoose
  .connect(`${Config.get("MONGODB_URI")}/SCATCH`)
  .then(() => {
    dbug("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });

module.exports = mongoose.connection;

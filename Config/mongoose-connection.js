const mongoose = require("mongoose");
const Config = require("config");
const dbug = require("debug")("development:mongoose");

try {
  mongoose.connect(`${Config.get("MONGODB_URI")}/SCATCH`);
  dbug("Connected to MongoDB successfully");
} catch (error) {
  console.log("Failed to connect to MongoDB", error);
  process.exit(1); // Optional: Exit the app if unable to connect
}

module.exports = mongoose.connection;

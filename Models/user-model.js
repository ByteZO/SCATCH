const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://miniprojectUser:mini2551@cluster0.t3mxm.mongodb.net/SCATCH"
);

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  isAdmin: Boolean,
  contact: Number,
  picture: String,
});

module.exports = mongoose.module("User", userSchema);

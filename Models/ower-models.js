const mongoose = require("mongoose");

const owerSchema = mongoose.Schema({
  fullName: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  gstNumber: Number,
  picture: String,
});

module.exports = mongoose.model("Owner", owerSchema);

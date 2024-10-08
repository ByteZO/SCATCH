const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: Buffer,
  name: String,
  discount: {
    type: Number,
    default: 0,
  },
  bgColor: String,
  panelColor: String,
  textColor: String,
  price: Number,
});

module.exports = mongoose.model("Product", productSchema);

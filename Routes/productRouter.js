const express = require("express");
const upload = require("../Config/multer-config");
const productModel = require("../Models/product-model");
const Router = express.Router();

Router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, discount, bgColor, panelColor, textColor } = req.body;
    const productCreated = await productModel.create({
      image: req.file.buffer,
      name,
      discount,
      bgColor,
      panelColor,
      textColor,
    });
    res.send(productCreated);
  } catch (error) {
    console.log("productCreation error >>>", error);
  }
});

module.exports = Router;

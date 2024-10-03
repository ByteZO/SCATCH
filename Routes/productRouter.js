const express = require("express");
const upload = require("../Config/multer-config");
const productModel = require("../Models/product-model");
const Router = express.Router();

Router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    console.log(name, price, discount, bgcolor, panelcolor, textcolor);

    const productCreated = await productModel.create({
      image: req.file.buffer,
      name: name,
      price: price,
      discount: discount,
      bgColor: bgcolor,
      panelColor: panelcolor,
      textColor: textcolor,
    });
    req.flash("success", "Product Created Successfully");
    res.redirect("/owners/admin");
  } catch (error) {
    console.log("productCreation error >>>", error);
  }
});

module.exports = Router;

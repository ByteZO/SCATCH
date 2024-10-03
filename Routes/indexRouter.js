const express = require("express");
const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const productModel = require("../Models/product-model");
const userModel = require("../Models/user-model");
const Router = express.Router();

Router.get("/", (req, res) => {
  const error = req.flash("error");

  res.render("index", { error, loggedIn: false });
});

Router.get("/shop", isLoggedIn, async (req, res) => {
  const success = req.flash("success");
  const products = await productModel.find();
  res.render("shop", { products, success });
});

Router.get("/add-to-cart/:productId", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  await user.cart.push(req.params.productId);
  user.save();
  req.flash("success", " Added to cart ");
  res.redirect("/shop");
});

Router.get("/cart", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  res.render("cart", { user });
});

Router.get("/logout", isLoggedIn, (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

module.exports = Router;

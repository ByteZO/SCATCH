const express = require("express");
const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const Router = express.Router();

Router.get("/", (req, res) => {
  const error = req.flash("error");
 

  res.render("index", { error });
});

Router.get("/shop", isLoggedIn, (req, res) => {
  console.log("i am in shop");
  res.render("shop");
});

module.exports = Router;

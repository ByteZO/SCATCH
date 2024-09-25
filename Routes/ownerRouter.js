const express = require("express");
const owerModels = require("../Models/ower-models");

const Router = express.Router();

Router.get("/admin", async (req, res) => {
  const success = req.flash("success");
  res.render("createproducts", { success });
});
Router.get("/owner_logIn", async (req, res) => {
  const error = req.flash("error");
  res.render("owner-login", { error });
});

Router.post("/create", async (req, res) => {
  try {
    const owner = await owerModels.find();
    req.flash("error", "You don't have permission to create a new owner");
    if (owner.length > 0) {
      return res.status(503).redirect("/owners/owner_logIn");
    }
    const { fullName, email, password } = req.body;
    const ownerCreated = await owerModels.create({
      fullName,
      email,
      password,
    });
    console.log(ownerCreated);

    return res
      .status(201)
      .json({ ...ownerCreated.toObject(), message: "Owner is Created" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
});

module.exports = Router;

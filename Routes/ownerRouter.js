const express = require("express");
const owerModels = require("../Models/ower-models");

const Router = express.Router();

if (process.env.NODE_ENV === "development") {
  Router.post("/create", async (req, res) => {
    try {
      const owner = await owerModels.find();

      if (owner.length > 0) {
        return res
          .status(503)
          .send("You don't have permission to create a new owner");
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
}

module.exports = Router;

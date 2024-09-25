const bcrypt = require("bcrypt");
const { generateToken } = require("../Utils/generateToken");
const cookieParser = require("cookie-parser");
const userModel = require("../Models/user-model");

module.exports.registerUser = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "The user already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      fullName,
    });

    const token = generateToken(newUser);
    res.cookie("token", token);

    res
      .status(200)
      .json({
        ...newUser.toObject(),
        message: "User Registered Successfully",
      })
      .redirect("/shop");
  } catch (error) {
    console.log("Error in user creation", error);
    res.status(500).json({ message: "User registration failed", error });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email or Password is wrong" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Server error during password comparison" });
      }

      if (!result) {
        req.flash("error", "Email or Password is wrong");
        return res.status(401).redirect("/");
      }

      const token = generateToken(user);
      res.cookie("token", token);
      return res.status(200).redirect("/shop");
    });
  } catch (error) {
    console.log("Error in user login", error);
    return res.status(500).json({ message: "User failed to login", error });
  }
};

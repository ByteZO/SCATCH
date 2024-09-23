const jwt = require("jsonwebtoken");
const User = require("../Models/user-model");

module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first ");
    res.redirect("/");
  }
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const user = User.findOne({
      email: decoded.email,
    }).select("-password");
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "you need to login first ");
    res.redirect("/");
    console.log("is loggedIn error ", error);
  }
};

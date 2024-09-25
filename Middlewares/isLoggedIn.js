const jwt = require("jsonwebtoken");
const User = require("../Models/user-model");

module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );
    req.user = user;

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/");
    }

    next();
  } catch (error) {
    req.flash("error", "You need to login first");
    return res.redirect("/");
  }
};

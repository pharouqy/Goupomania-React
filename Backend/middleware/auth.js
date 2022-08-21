const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      error: "You must log in",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decoded._id).then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "User not found",
        });
      } else {
        if (
          user._id.toString() === decoded._id || // if user is the owner of the post
          decoded.isAdmin === true // user is admin
        ) {
          // if user is admin or if user is the same as the one who sent the request
          next();
        } else {
          return res.status(403).json({
            message: "Forbidden",
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

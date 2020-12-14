const jwt = require('jsonwebtoken');
const User = require('../model/User');
const requireAuth = function (req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decodedToken) {
      if (err) {
        res
          .status(403)
          .json({ message: "You're not authenticated, please try to login" });
      } else {
        User.findOne({ _id: decodedToken.id }, function (err, doc) {
          if (err) console.log(err);
          req.user = doc;
          next();
        });
      }
    });
  } else {
    res.status(401).json({
      message: "You're not authorized , please check your token or login",
    });
  }
};

module.exports = requireAuth;

const User = require("../db/models/User");

//require a user to be logged into continue
const requireToken = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.cookies.token);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken };

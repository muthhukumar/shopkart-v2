const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const header = req.get("Authorization");

  if (!header || header === "") {
    req.isAuth = false;
    return next();
  }

  const token = header.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!payload) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = payload.userId;
  return next();
};

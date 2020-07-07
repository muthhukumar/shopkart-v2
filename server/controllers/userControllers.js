const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../lib/generateToken");

const signup = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(
      new Error("Invalid credentials passed, check credentials and try again")
    );
  }

  const { username, email, password, phonenumber } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  if (existingUser) {
    return next(new Error("User already exists, Login instead"));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  const newUser = new User({
    username,
    hashedPassword,
    email,
    phonenumber,
    cart: [],
    favourites: [],
  });

  let accessToken, refresh_token;
  try {
    accessToken = generateAccessToken(newUser._id);
    refresh_token = generateRefreshToken(newUser._id);
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  newUser.refresh_token = refresh_token;

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    return next(new Error("Creating new user failed, try again later", err));
  }

  res.cookie("refreshtoken", refresh_token, {
    path: "/api/v1/user/refresh_token",
    httpOnly: true,
  });

  res.json({ accesstoken: accessToken });
};

const login = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(
      new Error("Invalid credentials passed, check credentials and try again")
    );
  }

  const { email, password } = req.body;

  let user;

  try {
    user = await User.findOne({ email });
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  if (!user) {
    return next(new Error("User not found, check credentials and try again"));
  }

  let isValid = false;
  try {
    isValid = await bcrypt.compare(password, user.hashedPassword);
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  if (!isValid)
    return next(
      new Error("Invalid credentials passed, check credentials and try again")
    );

  let accessToken, refresh_token;
  try {
    accessToken = generateAccessToken(user._id);
    refresh_token = generateRefreshToken(user._id);
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  user.refresh_token = refresh_token;

  try {
    await user.save();
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  res.cookie("refreshtoken", refresh_token, {
    path: "/api/v1/user/refresh_token",
    httpOnly: true,
  });
  res.json({ accesstoken: accessToken });
};

const refresh_token = async (req, res, next) => {
  const token = req.cookies.refreshtoken;

  if (!token || token === "") return next(new Error("You need to login"));

  let payload;

  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  let user;

  try {
    user = await User.findById(payload.userId);
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  if (!user) return next(new Error("User not fount"));

  //TODO add whether the token is expired or not
  if (token !== user.refresh_token || !user.refresh_token)
    return next(new Error("Invalid token"));

  let accessToken, refresh_token;
  try {
    accessToken = generateAccessToken(user._id);
    refresh_token = generateRefreshToken(user._id);
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  user.refresh_token = refresh_token;

  try {
    await user.save();
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  res.cookie("refreshtoken", refresh_token, {
    path: "/api/v1/user/refresh_token",
    httpOnly: true,
  });
  res.status(201).json({ accesstoken: accessToken });
};

const logout = (req, res, next) => {
  res.clearCookie("refreshtoken", {
    path: "/api/v1/user/refresh_token",
  });

  res.status(200).json({ message: "logout successful" });
};

module.exports = {
  login,
  logout,
  signup,
  refresh_token,
};

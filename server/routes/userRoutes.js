const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  logout,
  login,
  signup,
  refresh_token,
} = require("../controllers/userControllers");

router.post(
  "/signup",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
    check("phonenumber").isLength({ max: 10, min: 10 }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  login
);

router.get("/refresh_token", refresh_token);

router.get("/logout", logout);

module.exports = router;

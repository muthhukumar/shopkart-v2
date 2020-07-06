const { validationResult } = require("express-validator");

const Product = require("../models/productSchema");
const User = require("../models/userSchema");

const addProduct = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) return next(new Error("Invalid inputs passed"));

  if (!req.isAuth) {
    res.statusCode = 401;
    return next(new Error("UnAuthorized"));
  }
  let user;
  try {
    user = await User.findById(req.userId);
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  if (!user) return next(new Error("user not found"));

  const { productId, productCount } = req.body;

  user.cart.push({ productId, productCount });

  try {
    await user.save();
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  res.status(200).json({ cart: user.cart });
};

const updateProduct = async (req, res, next) => {
  if (!req.isAuth) {
    res.statusCode = 401;
    return next(new Error("UnAuthorized"));
  }
  let user;
  try {
    user = await User.findById(req.userId);
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  if (!user) return next(new Error("user not found"));
};

const removeProduct = async (req, res, next) => {
  if (!req.isAuth) {
    res.statusCode = 401;
    return next(new Error("UnAuthorized"));
  }
  let user;
  try {
    user = await User.findById(req.userId);
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  if (!user) return next(new Error("user not found"));

  const id = req.params.id;

  const product = user.cart.filter(
    (product) => product.productId.toString() === id
  );

  if (!product) return next(new Error("product not found"));

  const index = user.cart.findIndex(
    (product) => product.productId.toString() === id
  );

  user.cart.splice(index, 1);

  try {
    await user.save();
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  res.json({ cart: user.cart });
};

const products = async (req, res, next) => {
  if (!req.isAuth) {
    error.code = 401;
    return next(new Error("UnAuthorized"));
  }

  let user;
  try {
    user = await User.findById(req.userId);
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  if (!user) return next(new Error("user not found"));
  let products;

  const productsIds = [];
  for (let i = 0; i < user.cart.length; i++) {
    productsIds.push(user.cart[i].productId);
  }

  try {
    products = await Product.find({ _id: { $in: productsIds } });
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  if (!products) return next(new Error("products not found"));

  res.status(200).json({ products });
};

module.exports = {
  addProduct,
  updateProduct,
  removeProduct,
  products,
};

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

  const product = user.cart.filter(
    (product) => product.productId.toString() === productId
  );

  if (product.length !== 0) return res.status(200).json({ cart: user.cart });

  user.cart.push({ productId, productCount });

  try {
    await user.save();
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  res.status(200).json({ cart: user.cart });
};

const updateProduct = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty() || req.body.productCount <= 0)
    return next(new Error("Invalid values passed"));
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

  const { productCount, productId } = req.body;

  const product = user.cart.filter(
    (product) => product.productId.toString() === productId
  );

  if (!product) return next(new Error("product not found"));

  const index = user.cart.findIndex(
    (product) => product.productId.toString() === productId
  );

  const updatedProduct = {
    _id: user.cart[index]._id,
    productId: user.cart[index].productId,
    productCount,
  };

  try {
    user.cart.splice(index, 1);
    user.cart.push(updatedProduct);
  } catch (err) {
    return next(new Error("something went wrong", err));
  }

  try {
    await user.save();
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  res.status(200).json({ cart: user.cart });
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

  if (product.length === 0)
    return res.status(200).json({ message: "not found", products: user.cart });

  const index = user.cart.findIndex(
    (product) => product.productId.toString() === id
  );

  user.cart.splice(index, 1);

  try {
    await user.save();
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  res.json({ products: user.cart });
};

const products = async (req, res, next) => {
  if (!req.isAuth) {
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

  const allProducts = [];
  for (let i = 0; i < user.cart.length; i++) {
    let prod = {
      _id: products[i]._id,
      productName: products[i].productName,
      productPrice: products[i].productPrice,
      productUrl: products[i].productUrl,
      count: user.cart[i].productCount,
    };
    allProducts.push(prod);
  }

  res.status(200).json({ products: allProducts });
};

const addFavourite = async (req, res, next) => {
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

  const favourite = user.favourites.filter(
    (favourite) => favourite.toString() === id
  );

  if (favourite.length !== 0)
    return res.status(200).json({ favourite: user.favourites });

  user.favourites.push(id);

  try {
    await user.save();
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  res.status(200).json({ favourites: user.favourites });
};

const favourites = async (req, res, next) => {
  if (!req.isAuth) {
    return next(new Error("UnAuthorized"));
  }

  let user;
  try {
    user = await User.findById(req.userId);
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  if (!user) return next(new Error("user not found"));

  let favourites;
  try {
    favourites = await Product.find({ _id: { $in: user.favourites } });
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  if (!favourites) return next(new Error("favourites not found"));

  res.status(200).json({ favourites });
};

const removeFavourite = async (req, res, next) => {
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

  const favourite = user.favourites.filter(
    (favourite) => favourite.toString() === id
  );

  if (favourite.length === 0)
    return res
      .status(200)
      .json({ message: "not found", favourites: user.favourites });

  const index = user.favourites.findIndex(
    (favourite) => favourite.toString() === id
  );

  if (user.favourites[index].toString() !== id)
    return res.status(200).json({ favourites: user.favourites });
  user.favourites.splice(index, 1);

  try {
    await user.save();
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  res.json({ favourites: user.favourites });
};
module.exports = {
  addProduct,
  updateProduct,
  removeProduct,
  products,
  addFavourite,
  removeFavourite,
  favourites,
};

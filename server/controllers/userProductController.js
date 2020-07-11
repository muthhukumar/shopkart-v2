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
    return next(new Error("Adding product to the cart failed"));
  }

  const productsIds = [];
  for (let i = 0; i < user.cart.length; i++) {
    productsIds.push(user.cart[i].productId);
  }

  let userProducts;
  try {
    userProducts = await Product.find({ _id: { $in: productsIds } });
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  const allProducts = [];
  for (let i = 0; i < user.cart.length; i++) {
    let prod = {
      _id: userProducts[i]._id,
      productName: userProducts[i].productName,
      productPrice: userProducts[i].productPrice,
      productUrl: userProducts[i].productUrl,
    };
    const prodcount = user.cart.filter(
      (prod) => prod.productId.toString() === userProducts[i]._id.toString()
    );
    prod.count = prodcount[0].productCount;
    allProducts.push(prod);
  }

  res.status(200).json({ products: allProducts });
};

const updateProduct = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty() || req.body.productCount <= 0) {
    return next(new Error("Invalid values passed"));
  }
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
  const productsIds = [];
  for (let i = 0; i < user.cart.length; i++) {
    productsIds.push(user.cart[i].productId);
  }
  let userProducts;
  try {
    userProducts = await Product.find({ _id: { $in: productsIds } });
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  const allProducts = [];
  for (let i = 0; i < user.cart.length; i++) {
    let prod = {
      _id: userProducts[i]._id,
      productName: userProducts[i].productName,
      productPrice: userProducts[i].productPrice,
      productUrl: userProducts[i].productUrl,
    };
    const prodcount = user.cart.filter(
      (prod) => prod.productId.toString() === userProducts[i]._id.toString()
    );
    prod.count = prodcount[0].productCount;

    allProducts.push(prod);
  }

  res.status(200).json({ products: allProducts });
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
    return res
      .status(200)
      .json({ message: "Product not found", products: user.cart });

  const index = user.cart.findIndex(
    (product) => product.productId.toString() === id
  );

  user.cart.splice(index, 1);

  try {
    await user.save();
  } catch (err) {
    return next(new Error("Updating cart failed"));
  }
  const productsIds = [];
  for (let i = 0; i < user.cart.length; i++) {
    productsIds.push(user.cart[i].productId);
  }

  let userProducts;
  try {
    userProducts = await Product.find({ _id: { $in: productsIds } });
  } catch (err) {
    return next(new Error("something went wrong", err));
  }

  const allProducts = [];
  for (let i = 0; i < user.cart.length; i++) {
    let prod = {
      _id: userProducts[i]._id,
      productName: userProducts[i].productName,
      productPrice: userProducts[i].productPrice,
      productUrl: userProducts[i].productUrl,
    };
    const prodcount = user.cart.filter(
      (prod) => prod.productId.toString() === userProducts[i]._id.toString()
    );
    prod.count = prodcount[0].productCount;
    allProducts.push(prod);
  }

  res.status(200).json({ products: allProducts });
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

  const productsIds = [];
  for (let i = 0; i < user.cart.length; i++) {
    productsIds.push(user.cart[i].productId);
  }

  let userProducts;
  try {
    userProducts = await Product.find({ _id: { $in: productsIds } });
  } catch (err) {
    return next(new Error("something went wrong when getting products"));
  }

  const allProducts = [];
  for (let i = 0; i < user.cart.length; i++) {
    let prod = {
      _id: userProducts[i]._id,
      productName: userProducts[i].productName,
      productPrice: userProducts[i].productPrice,
      productUrl: userProducts[i].productUrl,
    };
    const prodcount = user.cart.filter(
      (prod) => prod.productId.toString() === userProducts[i]._id.toString()
    );
    allProducts.push(prod);
    prod.count = prodcount[0].productCount;
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
    return next(new Error("Adding favourite failed"));
  }

  let favourites;
  try {
    favourites = await Product.find({ _id: { $in: user.favourites } });
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  res.status(200).json({ favourites });
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
    return next(new Error("something went wrong when getting favourites"));
  }

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
      .json({ message: "favourite not found", favourites: user.favourites });

  const index = user.favourites.findIndex(
    (favourite) => favourite.toString() === id
  );

  if (user.favourites[index].toString() !== id)
    return res.status(200).json({ favourites: user.favourites });
  user.favourites.splice(index, 1);

  try {
    await user.save();
  } catch (err) {
    return next(new Error("Removing favourite failed"));
  }

  let favourites;
  try {
    favourites = await Product.find({ _id: { $in: user.favourites } });
  } catch (err) {
    return next(new Error("something went wrong"));
  }

  res.status(200).json({ favourites });
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

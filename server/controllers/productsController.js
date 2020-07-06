const Product = require("../models/productSchema");
const { validationResult } = require("express-validator");

const addProduct = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty() || req.body.productPrice <= 100)
    return next(new Error("Invalid inputs passed, check inputs and try again"));

  const { productName, productUrl, productPrice } = req.body;

  const newProduct = new Product({
    productPrice,
    productUrl,
    productName,
  });

  try {
    await newProduct.save();
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  res.json({
    messgae: "product successful added",
    product: newProduct,
  });
};

const products = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    return next(new Error("Something went wrong"));
  }

  res.status(200).json({ products });
};

module.exports = {
  products,
  addProduct,
};

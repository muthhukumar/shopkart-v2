const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newProduct = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productUrl: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", newProduct);

module.exports = Product;

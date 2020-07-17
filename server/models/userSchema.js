const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUser = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
  },
  phonenumber: {
    type: Number,
    required: true,
    minlength: 10,
  },
  favourites: {
    type: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
  },
  cart: {
    type: [
      {
        productId: {
          type: mongoose.ObjectId,
          ref: "Product",
        },
        productCount: { type: Number, default: 0 },
      },
    ],
  },
});

const User = mongoose.model("User", newUser);

module.exports = User;

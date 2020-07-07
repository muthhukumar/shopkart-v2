const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  addProduct,
  products,
  removeProduct,
  updateProduct,
  addFavourite,
  removeFavourite,
  favourites,
} = require("../controllers/userProductController");

router.get("/", products);

router.post(
  "/add",
  [
    check("productId").not().isEmpty().isString(),
    check("productCount").not().isEmpty().isNumeric({ min: 1 }),
  ],
  addProduct
);

router.patch(
  "/",
  [
    check("productId").not().isEmpty().isString(),
    check("productCount").not().isEmpty().isNumeric({ min: 1 }),
  ],
  updateProduct
);

router.delete("/:id", removeProduct);

router.post("/favourites/:id", addFavourite);

router.get("/favourites", favourites);

router.delete("/favourites/:id", removeFavourite);

module.exports = router;

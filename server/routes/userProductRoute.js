const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  addProduct,
  products,
  removeProduct,
  updateProduct,
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

router.patch("/", updateProduct);

router.delete("/:id", removeProduct);

module.exports = router;

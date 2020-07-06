const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { addProduct, products } = require("../controllers/productsController");

router.get("/", products);

router.post(
  "/add",
  [
    check("productUrl").not().isEmpty().isURL(),
    check("productName").not().isEmpty(),
    check("productPrice").not().isEmpty().isNumeric({ min: 100 }),
  ],
  addProduct
);

module.exports = router;

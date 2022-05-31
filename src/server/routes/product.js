const express = require("express");
let router = express.Router();

let product = require("../controllers/product");
router.get("/checkout",product.getCheckout);
router.get("/remove/:id",product.remove);
router.get("/:product",product.getaddcart);
router.post("/:product",product.addcart);

module.exports = router;

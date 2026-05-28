const express = require("express");

const router = express.Router();

const {
  getProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.get("/", getProducts);

router.post("/", createProduct);

router.get("/:id", getSingleProduct);

router.delete("/:id",deleteProduct);

router.put("/:id",updateProduct);

module.exports = router;
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const products = await Product.find(keyword)
    .limit(limit)
    .skip(skip);

  res.json({
    success: true,
    page,
    count: products.length,
    products,
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);

    throw new Error("Product not found");
  }

  res.json({
    success: true,
    product,
  });
});

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.name = req.body.name || product.name;

    product.price = req.body.price || product.price;

    product.brand = req.body.brand || product.brand;

    product.stock = req.body.stock || product.stock;

    product.description =
      req.body.description || product.description;

    const updatedProduct = await product.save();

    res.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    getProducts,
    createProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
};
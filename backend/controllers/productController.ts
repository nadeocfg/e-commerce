import Product from '../schemas/productSchema';
import express from 'express';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const products = await Product.find({});
    response.json(products);
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// @desc   Fetch single product by id
// @route  GET /api/products/:id
// @access Public
const getProductById = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const product = await Product.findById(request.params.id);

    if (product) {
      return response.json(product);
    }

    response.status(404).json({
      message: `Product with id ${request.params.id} not found`,
    });
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { getProducts, getProductById };

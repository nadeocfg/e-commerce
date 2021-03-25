import Product from '../schemas/productSchema';
import express, { NextFunction } from 'express';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = async (
  request: express.Request,
  response: express.Response
) => {
  const products = await Product.find({});

  if (products) {
    response.json(products);
  } else {
    response.status(404).json({
      message: products.message,
    });
    console.error(`Error: ${products.message}`);
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
    response.json(product);
  } catch (error) {
    response.status(404);
    response.json({
      message: `Product with id ${request.params.id} not found`,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
  }
};

export { getProducts, getProductById };

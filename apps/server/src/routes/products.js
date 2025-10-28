import express from 'express';
import { getAllProducts } from '../db/index.js';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  const products = await getAllProducts();
  console.log(products);
  res.json({
    products
  });
});

export default productsRouter;

import express from 'express';
import { getAllProducts, getProductsByCategory, getProductById } from '../db/index.js';

const productsRouter = express.Router();


productsRouter.get('/', async (req, res, next) => {
  const category = req.query.category;

  let products = [];

  if(!category) {
    products = await getAllProducts();
  } else {
    products = await getProductsByCategory(category);
  };

  res.json({
    products
  });
});

productsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const product = await getProductById(id);
  res.json({
    product
  });
})


export default productsRouter;

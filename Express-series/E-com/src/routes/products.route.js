const express = require('express');
const { addProduct, getProductById, getAllProducts } = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.get("/products" , getAllProducts)


productRouter.post("/products" , addProduct)

productRouter.get("/products/:id" , getProductById)

module.exports = productRouter;
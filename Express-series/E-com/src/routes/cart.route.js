const express = require('express');
const { getCartByuserId, addToCart } = require('../controllers/cart.controller');
const cartRouter = express.Router();

cartRouter.get("/cart/:id" ,getCartByuserId)

cartRouter.post("/cart/:id" ,addToCart)


module.exports = cartRouter; 
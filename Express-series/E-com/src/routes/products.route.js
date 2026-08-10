const express = require('express');

const productRouter = express.Router();

productRouter.get("/products" , (req , res)=>{
    res.send("Fetching all products");
})


productRouter.post("/products" , (req , res)=>{
    res.send("Adding a new product");
})

productRouter.get("/products/:id" , (req , res)=>{
    const productId = req.params.id;
    res.send(`Fetching product with ID: ${productId}`);
})

module.exports = productRouter;
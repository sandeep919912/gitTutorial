const express = require('express');

const cartRouter = express.Router();

cartRouter.get("/cart/:id" , (req , res)=>{
    const userId = req.params.id;
    res.send(`Fetching cart for user with ID: ${userId}`);
})

cartRouter.post("/cart/:id" , (req , res)=>{
    const userId = req.params.id;
    res.send(`Adding item to cart for user with ID: ${userId}`);
})


module.exports = cartRouter; 
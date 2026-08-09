const express = require("express")

const productRouter = express.Router()


productRouter.get('/products' , (req, res)=>{
    res.send("Here is the list of all products.");
})

productRouter.post('/products' , (req, res)=>{
    res.send("A new product has been added.");
})

module.exports = productRouter;
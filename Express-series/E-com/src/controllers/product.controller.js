const { readProductsFromFile, sortByPrice } = require("../services/productServices");
const path = require('path');
const { sendErrorResponse } = require("../utils/response");

const addProduct = (req , res)=>{

    res.json({message : `product added successfully named ${req.body.name}`});
}

const getAllProducts = (req , res)=>{
    // let products = readProductsFromFile()
    
    // products = sortByPrice(req.query , products)

    // res.send(products)

    res.sendFile(path.join(__dirname , "../view/productsForm.html"))
}


const getProductById = (req , res)=>{
    const productId = req.params.id;

    if(productId > 10) sendErrorResponse(res , {message:"productId not valid" , statusCode:404})
    res.send(`Fetching product with ID: ${productId}`);
}
module.exports = {
    addProduct,
    getAllProducts,
    getProductById
}
const { readProductsFromFile, sortByPrice } = require("../services/productServices");
const path = require('path');

const addProduct = (req , res)=>{
    res.send("Adding a new product");
}

const getAllProducts = (req , res)=>{
    // let products = readProductsFromFile()
    
    // products = sortByPrice(req.query , products)

    // res.send(products)

    res.sendFile(path.join(__dirname , "../view/productsForm.html"))
}

const getProductById = (req , res)=>{
    const productId = req.params.id;
    res.send(`Fetching product with ID: ${productId}`);
}
module.exports = {
    addProduct,
    getAllProducts,
    getProductById
}
const fs = require('fs');
const path = require('path');

const readProductsFromFile = () => {
    const filePath = path.join(__dirname, '../data/products.json');
    const productData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(productData);
}


const sortByPrice = (req, productData) => {
    
    if(req.sortBy === "price") {
        return productData.sort((a, b) => a.price - b.price);
    }

    return productData;
}

module.exports = {
    readProductsFromFile,
    sortByPrice
}
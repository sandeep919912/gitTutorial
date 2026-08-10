const getCartByuserId =  (req , res)=>{
    const userId = req.params.id;
    res.send(`Fetching cart for user with ID: ${userId}`);
}

const addToCart = (req , res)=>{
    const userId = req.params.id;
    res.send(`Adding item to cart for user with ID: ${userId}`);
}

module.exports = {
    getCartByuserId,
    addToCart
}
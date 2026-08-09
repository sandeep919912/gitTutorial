const express = require('express');
const productRouter = require('./routes/products.route')
const cRouter = require('./routes/category.route')

const app = express();

app.use("/api" , (req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
});

app.use("/api" , productRouter)

app.use("/api" , cRouter)

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});


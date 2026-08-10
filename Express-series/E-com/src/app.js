const express = require("express");
const userRouter = require("./routes/users.route");
const productRouter = require("./routes/products.route");
const cartRouter = require("./routes/cart.route");

const app = express();

app.use("/" , userRouter);
app.use("/" , productRouter);
app.use("/" , cartRouter);

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
})
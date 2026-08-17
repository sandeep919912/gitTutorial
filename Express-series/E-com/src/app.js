const express = require("express");
const userRouter = require("./routes/users.route");
const productRouter = require("./routes/products.route");
const cartRouter = require("./routes/cart.route");

const app = express();

// Serve the public folder both at "/public/..." and at the root
app.use("/public", express.static("public"));
app.use(express.static("public"));
app.use(express.json());

// Allow the page (Live Server on port 5500 or Express on 3000) to call this API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use("/" , userRouter);
app.use("/" , productRouter);
app.use("/" , cartRouter);

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
})
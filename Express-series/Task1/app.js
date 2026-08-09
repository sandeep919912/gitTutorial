const express = require('express');

const app = express();

app.use("/welcome", (req, res, next) => {
    req.user = "Guest"
    next();
});

app.get('/orders', (req, res) => {
    console.log("Here is the list of all orders");
    res.send(`<h1>Here is the list of all orders</h1>`);
});

app.post('/orders', (req, res) => {
    console.log("A new order has been created");
    res.json({ message: "A new order has been created" });
});

app.get('/users', (req, res) => {
    console.log("Here is the list of all users");
    res.send(`<h1>Here is the list of all users</h1>`);
});

app.post('/users' , (req , res)=>{
    console.log("A new user has been created");
    res.json({ message: "A new user has been created" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


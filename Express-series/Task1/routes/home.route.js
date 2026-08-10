const express = require('express');

const homeRouter = express.Router();

homeRouter.get("/home", (req, res) => {
    console.log("Welcome to the Home Page");
    res.send("Welcome to the Home Page");
});

module.exports = homeRouter;
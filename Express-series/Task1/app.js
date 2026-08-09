const express = require('express');

const app = express();

app.use("/welcome", (req, res, next) => {
    req.user = "Guest"
    next();
});

app.get('/welcome', (req, res) => {
    res.send(`Welcome ${req.user}`);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


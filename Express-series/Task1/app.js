const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("In the middleware");
    next();
});

app.use((req, res, next) => {
    console.log("In the second middleware");
    res.send("<h1>Hello from Express</h1>");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


const express = require('express');
const bookRouter = require('./routes/books.routes')

const app = express();

app.use("/" , bookRouter)

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});


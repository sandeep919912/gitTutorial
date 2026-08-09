const express = require("express")

const bookRouter = express.Router()


bookRouter.get('/books' , (req, res)=>{
    res.send("Here is the list of all books.");
})

bookRouter.post('/books' , (req, res)=>{
    res.send("A new book has been added.");
})

module.exports = bookRouter;
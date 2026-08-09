const express = require("express")

const cRouter = express.Router()


cRouter.get('/category' , (req, res)=>{
  res.send("Here is the list of all categories.");
})

cRouter.post('/category' , (req, res)=>{
     res.send("A new category has been created.");
})

module.exports = cRouter;
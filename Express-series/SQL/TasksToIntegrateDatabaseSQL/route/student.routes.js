const express = require("express")
const studentRouter = express.Router()
const {addEntries, updateEntries , deleteEntries} = require("../controllers/student.controller")

studentRouter.post("/add" , addEntries)
studentRouter.put("/update/:id" , updateEntries)
studentRouter.delete("/delete/:id" , deleteEntries)

module.exports=studentRouter;
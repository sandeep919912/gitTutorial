const express = require("express");
const { addExpences, getExpences, deleteExpences } = require("../controllers/expences.controller");

const expenceRouter = express.Router()

expenceRouter.post("/add" , addExpences)
expenceRouter.get("/get" , getExpences)
expenceRouter.delete("/delete/:id" , deleteExpences)

module.exports=expenceRouter;
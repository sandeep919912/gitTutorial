const express = require("express");
const { addExpences, getExpencesForUser, deleteExpences } = require("../controllers/expences.controller");

const expenceRouter = express.Router()

expenceRouter.post("/add" , addExpences)
expenceRouter.get("/get" , getExpencesForUser)
expenceRouter.delete("/delete/:id" , deleteExpences)

module.exports=expenceRouter;
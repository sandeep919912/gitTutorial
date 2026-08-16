const express = require("express");
const connection = require("../utils/db.connection");
const { registerUser , getUsers} = require("../controllers/user.controller");

const userRouter = express.Router()

userRouter.post("/add" , registerUser)
userRouter.get("/get" , getUsers)

module.exports=userRouter;
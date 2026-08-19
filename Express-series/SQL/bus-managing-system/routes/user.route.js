const express = require("express");
const connection = require("../utils/db.connection");
const { registerUser , getUsers, getBusBookingsByUserId} = require("../controllers/user.controller");

const userRouter = express.Router()

userRouter.post("/add" , registerUser)
userRouter.get("/get" , getUsers)
userRouter.get("/:userId/bookings" , getBusBookingsByUserId)

module.exports=userRouter;
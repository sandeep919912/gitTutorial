const express = require('express');
const { getAllUsers , addUser , getUserById } = require('../controllers/users.controller');
const userRouter = express.Router();

userRouter.get("/users" ,getAllUsers)

userRouter.post("/users" ,addUser)

userRouter.get("/users/:id" ,getUserById)

module.exports = userRouter;
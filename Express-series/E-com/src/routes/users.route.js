const express = require('express');

const userRouter = express.Router();

userRouter.get("/users" , (req , res)=>{
    res.send("Fetching all users");
})


userRouter.post("/users" , (req , res)=>{
    res.send("Adding a new user");
})

userRouter.get("/users/:id" , (req , res)=>{
    const userId = req.params.id;
    res.send(`Fetching user with ID: ${userId}`);
})

module.exports = userRouter;
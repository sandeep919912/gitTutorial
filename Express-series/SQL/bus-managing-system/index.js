const express = require("express")
const userRouter = require("./routes/user.route")
const db = require("./utils/db.connection")
const busRouter = require("./routes/bus.router")
const app = express()

app.use(express.json())

app.get("/" , (req , res)=>{
    res.send("welcome to the bus management system")
})

app.use("/user" , userRouter)
app.use("/bus" , busRouter)

app.listen(3000 , (err)=>{
    console.log("server is running on port 3000")
})
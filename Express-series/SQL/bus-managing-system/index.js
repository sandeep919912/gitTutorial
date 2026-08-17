const express = require("express")
const userRouter = require("./routes/user.route")
const db = require("./utils/db.connection")
const busRouter = require("./routes/bus.router")
const app = express()

//model
const userModel = require("./models/user.model")
const busModel = require("./models/bus.model")

app.use(express.json())

app.get("/" , (req , res)=>{
    res.send("welcome to the bus management system")
})

app.use("/user" , userRouter)
app.use("/bus" , busRouter)

db.sync().then(()=>{
    app.listen(3000 , (err)=>{
        console.log("server is running at port 3000")
    })

}).catch((err)=>{
    console.log(err)
})
const express = require("express")
const userRouter = require("./routes/user.route")
const db = require("./utils/db.connection")
const busRouter = require("./routes/bus.router")
const bookingRouter = require("./routes/booking.route")
const app = express()

//model
require("./models")

app.use(express.json())

app.get("/" , (req , res)=>{
    res.send("welcome to the bus management system")
})

app.use("/user" , userRouter)
app.use("/bus" , busRouter)
app.use("/" , bookingRouter)

db.sync({alter:true}).then(()=>{
    app.listen(3000 , (err)=>{
        console.log("server is running at port 3000")
    })

}).catch((err)=>{
    console.log(err)
})
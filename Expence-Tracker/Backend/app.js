require("dotenv").config()
const express = require("express")
const sequelize = require("./config/db.connection")
const expenceRouter = require("./routes/expence.route")
const userRouter = require("./routes/users.route")
const cors = require("cors")
const paymentRouter = require("./routes/payment.route")
const leaderBoardRouter = require("./routes/leaderboard.route")
const genaiRouter = require("./routes/genai.route")

//models
require("./models/index")



const app = express()
app.use(cors())
app.use(express.json())

app.use("/expences" , expenceRouter)
app.use("/users" , userRouter)
app.use("/payments" , paymentRouter)
app.use("/leaderboard" , leaderBoardRouter)
app.use("/ai" , genaiRouter)


sequelize.sync().then(()=>{
    app.listen(3000 , (err)=>{
        console.log("server is running at port 3000")
    })
}).catch((err)=>{
    console.log(err.message)
}) 

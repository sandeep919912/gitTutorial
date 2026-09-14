require("dotenv").config()
const express = require("express")
const sequelize = require("./config/db.connection")
const expenceRouter = require("./routes/expence.route")
const userRouter = require("./routes/users.route")
const cors = require("cors")
const paymentRouter = require("./routes/payment.route")
const leaderBoardRouter = require("./routes/leaderboard.route")
const genaiRouter = require("./routes/genai.route")
const resetRouter = require("./routes/reset-pass.route")
const morgan = require("morgan")
const fs = require('fs')
const path = require("path")

//models
require("./models/index")



const app = express()
const accessLogStream = fs.createWriteStream(path.join(__dirname , "access.log") , {flags:"a"})

app.use(morgan("combined" , {stream:accessLogStream}))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/expences" , expenceRouter)
app.use("/users" , userRouter)
app.use("/payments" , paymentRouter)
app.use("/leaderboard" , leaderBoardRouter)
app.use("/ai" , genaiRouter)
app.use("/email" , resetRouter)

const PORT = process.env.PORT || 3000;

sequelize.sync().then(()=>{
    app.listen(PORT , (err)=>{
        console.log("server is running at port 3000")
    })
}).catch((err)=>{
    console.log(err.message)
}) 

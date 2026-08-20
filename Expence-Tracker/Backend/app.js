const express = require("express")
const sequelize = require("./config/db.connection")
const expenceRouter = require("./routes/expence.route")
const cors = require("cors")

//models
const expenceModel = require("./models/expences.model")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/expences" , expenceRouter)

sequelize.sync().then(()=>{
    app.listen(3000 , (err)=>{
        console.log("server is running at port 3000")
    })
}).catch((err)=>{
    console.log(err.message)
})
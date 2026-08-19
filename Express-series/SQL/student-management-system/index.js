const express = require("express")
const connection = require("./utils/db.connection")
const studentRouter = require("./routes/student.route")

//models
require("./models")

const app = express()

app.use(express.json())

app.use("/students" ,studentRouter)

connection.sync({ alter: true }).then(()=>{
    app.listen(3000 , (err)=>{
        console.log("server is running at port 3000")
    })

}).catch((err)=>{
    console.log(err)
})

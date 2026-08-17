const express = require("express")
const connection = require("./utils/db.connection")
const studentRouter = require("./routes/student.route")

//models
const studentModel = require("./models/students.models")

const app = express()

app.use(express.json())

app.use("/students" ,studentRouter)

connection.sync().then(()=>{
    app.listen(3000 , (err)=>{
        console.log("server is running at port 3000")
    })

}).catch((err)=>{
    console.log(err)
})

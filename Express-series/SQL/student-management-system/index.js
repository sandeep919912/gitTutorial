const express = require("express")
const connection = require("./utils/db.connection")
const studentRouter = require("./routes/student.route")
const courseRouter = require("./routes/course.route")

//models
require("./models")

const app = express()

app.use(express.json())

app.use("/students" ,studentRouter)
app.use("/courses" ,courseRouter)

connection.sync({ alter: true }).then(()=>{
    app.listen(3000 , (err)=>{
        console.log("server is running at port 3000")
    })

}).catch((err)=>{
    console.log(err)
})

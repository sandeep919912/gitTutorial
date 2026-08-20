import express from "express"
import sequelize from "./config/db.connection.js"
import "./models/index.js"
import studentRouter from "./routes/student.route.js"
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())

app.use("/students" , studentRouter)


sequelize.sync().then(()=>{
    app.listen(3000 , (err)=>{
        console.log("server is running at port 3000")
    })
}).catch((err)=>{
    console.log(err.message)
})
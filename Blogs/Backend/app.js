import express from "express"
import sequelize from "./config/db.connection.js"
import "./models/index.js"
import blogRouter from "./router/blog.router.js"
import commentRouter from "./router/comment.route.js"
import cors from "cors"


const app = express()

app.use(cors())

app.use(express.json())


app.use("/blogs" , blogRouter)
app.use("/comments" , commentRouter)

sequelize.sync().then(()=>{
    app.listen(3000 , (err)=>{
        console.log("server is running at port 3000")
    })
}).catch((err)=>{
    console.log(err)
})

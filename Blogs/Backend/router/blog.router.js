import express from "express"
import { deleteBlogs, getAllBlogs, getAllBlogsWithComment, postBlogs } from "../controllers/blog.controller.js"

const routes = express.Router()

routes.post("/post" , postBlogs)
routes.get("/get" , getAllBlogs)
routes.get("/getall" , getAllBlogsWithComment)
routes.delete("/delete/:id" , deleteBlogs)

export default routes
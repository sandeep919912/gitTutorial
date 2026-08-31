import express from "express"
import { deleteBlogs, getAllBlogs, postBlogs } from "../controllers/blog.controller.js"

const routes = express.Router()

routes.post("/post" , postBlogs)
routes.get("/get" , getAllBlogs)
routes.delete("/delete/:id" , deleteBlogs)

export default routes
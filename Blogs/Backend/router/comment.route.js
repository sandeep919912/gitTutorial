import express from "express"
import {deleteComment, getCommentsByblogs, postComment} from "../controllers/comment.controller.js"

const routes = express.Router()

routes.post("/post/:blogId" , postComment)
routes.get("/comments" , getCommentsByblogs)
routes.delete("/delete/:id" , deleteComment)

export default routes;
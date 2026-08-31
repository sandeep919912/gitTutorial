import { where } from "sequelize";
import { Blog, Comments } from "../models/index.js";

const postComment = async (req , res)=>{
    try {
        const {blogId} = req.params;
        const {comment } = req.body;
    
        const result = await Comments.create({
            blogId,
            comment,
        })
    
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({mesaage : error.message})
    }
}

const getCommentsByblogs = async (req , res) => {
    try {
        const {blogId} = req.query;
    
        const result = await Comments.findAll({
            where:{
                blogId
            }
        })
    
        res.status(200).json(result)
    } catch (error) {
        console.log(error.mesaage)
    }
}

const deleteComment = async (req ,res) => {
    try {
        const {id} = req.params;
        console.log("commentId" , id)
        
        await Comments.destroy({
            where:{
                id
            }
        })

        res.status(200).json({message:`comment with ${id} has been deleted`})
    } catch (error) {
        console.log(error.mesaage)
        res.status(500).json({message:error.mesaage})
    }
}
export  {postComment , getCommentsByblogs , deleteComment};
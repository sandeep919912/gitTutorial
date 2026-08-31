import { Blog } from "../models/index.js";

const postBlogs = async (req , res)=>{
    try {
        const {title , author , content} = req.body;

        if(!title || !author || !content){
            throw new Error("every field required")
        }

        const result = await Blog.create({
            title,
            author,
            content
        })

        res.status(201).json(result)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const deleteBlogs = async (req , res)=>{
    try {
        const {id} = req.params;
    
        await Blog.destroy({
            where:{
                id
            }
        })
        res.status(200).json({message:`blog with id ${id} has been deleted`})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllBlogs = async (req , res) => {
    try {
        const result = await Blog.findAll()

        res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}



export {postBlogs , getAllBlogs,deleteBlogs}
const {sendErrorResponse, sendSuccessResponse} = require("../utils/response")

const getAllUsers = (req , res)=>{
    res.send("Fetching all users");
}

const getUserById = (req , res)=>{
    try{
        if(!req.params.id){
            throw new Error("User ID is required");
        }
        const userId = Number(req.params.id);
        const user = {
            id:1,
            name :"sandy",  
            email: "sandy@gmail.com"
        }

        console.log(userId , user.id)
        if(userId === user.id) sendSuccessResponse(res , user)
        else throw new Error("Id is not there")
    } catch (err) {
        sendErrorResponse(res , err)
    }
}

const addUser = (req , res)=>{
    res.send("Adding a new user");
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser
}
const Users = require("../models/user.model");

const signup = async (req , res) => {
    try {
        const {name , email , password} = req.body;

        if(!name || !email || !password){
            return res.status(403).json({message:"All field requiered"})
        }

        const isUserExists = await Users.findOne({where:{
            email
        }})

        if(isUserExists){
            return res.status(403).json({message:"user already exist"})
        }

        const result = await Users.create({
            name,
            email,
            password
        })

        res.status(200).json("user registered successfully")
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


const login = async (req , res) => {
    try {
        const {email , password} = req.body;

        const user = await Users.findOne({where:{
            email
        }})

        // console.log(user)

        if(!user){
            return res.status(404).json({message:"user not exists"})
        }

        if(user.password !== password){
            return res.status(401).json({message:"user unauthorized"})
        }
        
        res.status(200).json({message:"user login successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


module.exports = {signup , login}
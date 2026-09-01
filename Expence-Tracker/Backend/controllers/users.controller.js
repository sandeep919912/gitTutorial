const Users = require("../models/user.model");
const bcrypt = require("bcrypt");

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

        bcrypt.hash(password , 10 , async (err , hash) => {
            if(err){
                return res.status(500).json({message:"something went wrong"})
            }
            
            const result = await Users.create({
                name,
                email,
                password: hash
            })
    
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

        bcrypt.compare(password , user.password , (err , result) => {
            if(err){
                return res.status(500).json({message:"something went wrong"})
            }
        
            if(!result){
                return res.status(403).json({message:"invalid password"})
            }
            
        })
        
        res.status(200).json({message:"user login successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


module.exports = {signup , login}
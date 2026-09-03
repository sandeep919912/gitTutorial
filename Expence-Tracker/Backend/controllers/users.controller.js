const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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

        const hash = await bcrypt.hash(password, 10);

        await Users.create({
            name,
            email,
            password: hash
        });

        res.status(200).json({ message: "user registered successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.SECRET_KEY
    )
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

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(403).json({ message: "invalid password" });
        }

        res.status(200).json({
            message: "user login successfully",
            token: generateToken(user.id),
            userId: user.id,
            isPremium: user.isPremium
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


const getProfile = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "token is missing" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await Users.findByPk(decoded.userId, {
            attributes: ["id", "name", "email", "isPremium"]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error: error.message });
    }
};


module.exports = {signup , login, getProfile}
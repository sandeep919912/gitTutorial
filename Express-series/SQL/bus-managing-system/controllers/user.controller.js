const connection = require("../utils/db.connection");
const User = require("../models/user.model")

const registerUser = async (req , res)=>{
     const { id, name, email } = req.body;

    try {
        const user = await User.create({
            id,
            name,
            email
        });

        console.log("User created:", user.id);

        res.status(201).json({
            message: `User with name ${name} has been registered`,
            user
        });

    } catch (error) {
        console.log("CREATE USER ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });
    }
};

const getUsers = async(req , res) => {
  try {
        const users = await User.findAll();

        res.status(200).json(users);

    } catch (error) {
        console.log("GET USERS ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });
    }
}

module.exports={registerUser , getUsers}
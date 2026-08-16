const connection = require("../utils/db.connection");

const registerUser = (req , res)=>{
     const {id , name , email} = req.body;

    const registerQuery = `
        INSERT INTO user (id,name , email) VALUES (?,?,?)
    `

    connection.execute(registerQuery , [id , name, email], (err , result)=>{
        if(err){
            console.log(err)
            connection.end()
            return
        }

        res.status(201).send(`user with name ${name} has been registered`)
    })
}

const getUsers = (req , res) => {
    const getQuery = `
        SELECT * FROM user
    `

    connection.execute(getQuery , (err , result)=>{
        if(err){
            console.log(err)
            connection.end()
            return;
        }

        res.status(200).json(result)
    })
}

module.exports={registerUser , getUsers}
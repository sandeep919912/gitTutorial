const express = require("express")
const app = express()
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Rootpass@123",
    database:"bus-booking-schema"
})

connection.connect((err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log("connection is successful")

    const createTable = `create table payment (
        id INT PRIMARY KEY,
        amountPaid INT,
        paymentMethod VARCHAR(100)
    )`

    connection.execute(createTable , (err)=>{
        if(err){
            console.log(err)
            connection.end()
            return 
        }
        console.log("table created")
    })

})


app.get("/" , (req , res)=>{
    res.send("server is running")
})

app.listen(3000 , (err)=>{
    console.log("server is running on port 3000")
})
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
        connection.end()
        return;
    }

    console.log("database connect successfully") 
})

module.exports=connection
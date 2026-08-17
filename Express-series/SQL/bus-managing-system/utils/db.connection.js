const {Sequelize} = require("sequelize")

const sequelize = new Sequelize(
    "bus-booking-schema",
    "root",
    "Rootpass@123",
    {
        host:"localhost",
        dialect:"mysql"
    }
);


(async()=>{
    try {
        await sequelize.authenticate()
        console.log("connection to the database has been created")
    } catch (error) {
        console.log(error)
    }
})()

module.exports=sequelize;






















// const mysql = require("mysql2")

// const connection = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Rootpass@123",
//     database:"bus-booking-schema"
// })

// connection.connect((err)=>{
//     if(err){
//         console.log(err)
//         connection.end()
//         return;
//     }

//     console.log("database connect successfully") 
// })

// module.exports=connection
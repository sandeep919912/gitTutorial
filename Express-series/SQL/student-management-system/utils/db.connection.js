// const mysql = require("mysql2")

// const connection = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Rootpass@123",
//     database:"students_m_s"
// })

// connection.connect((err)=>{
//     if(err){
//         console.log(err.message)
//         return;
//     }

//     const setStudentTable = `
//         CREATE TABLE IF NOT EXISTS students (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             name VARCHAR(100),
//             email VARCHAR(100) UNIQUE,
//             age INT
//         )
//     `;

//     connection.execute(setStudentTable , (err)=>{
//         if(err){
//             console.log(err.message)
//             return
//         }

//         console.log("student table is created")

//     })
// })

// module.exports=connection;


const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "students_m_s",
    "root",
    "Rootpass@123",
    {
        host: "localhost",
        dialect: "mysql"
    }
);

(async ()=>{
    try {
        await sequelize.authenticate()
        console.log("connection to the database has been created")
    } catch (error) {
        console.log(err)
    }
})()

module.exports = sequelize;
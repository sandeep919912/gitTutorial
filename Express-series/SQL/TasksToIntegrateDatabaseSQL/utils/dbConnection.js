const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rootpass@123",
    database: "testdb"
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Connection is successful");

    // Users Table
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255)
        )
    `;

    connection.execute(createUsersTable , (err)=>{
        if(err){
            console.log(err)
            connection.end()
            return 
        }

        console.log("student table has been created")
    })
    
});

module.exports=connection
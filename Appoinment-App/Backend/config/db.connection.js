const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("appoinments" , "root" , "Rootpass@123" , {
    host:"localhost",
    dialect:"mysql"
});

(async()=>{
    try {
        await sequelize.authenticate()
        console.log("connection to the database has been created")
    } catch (error) {
        console.log(error)
    }
})()

module.exports=sequelize
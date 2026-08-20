const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("expences","root","Rootpass@123" , {
    host:"localhost",
    dialect:"mysql"
})

module.exports=sequelize
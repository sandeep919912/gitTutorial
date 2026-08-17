const { DataTypes} = require("sequelize")
const sequelize = require("../config/db.connection")

const User = sequelize.define(
    "user",
    {
     id :{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull:false
    }
})

module.exports=User
const {DataTypes} = require("sequelize")
const sequelize = require("../utils/db.connection")

const Department = sequelize.define("department" , {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name : {
        type : DataTypes.STRING,
        allowNull:false
    }
})

module.exports= Department
const {DataTypes} = require("sequelize")
const sequelize = require("../utils/db.connection")

const StudentCourse = sequelize.define("studentCourse" , {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
})

module.exports= StudentCourse
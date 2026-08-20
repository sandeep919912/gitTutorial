import { DataTypes } from "sequelize"
import sequelize from "../config/db.connection.js"

const Student = sequelize.define("student" , {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default Student
import { DataTypes } from "sequelize";
import sequelize from "../config/db.connection.js";

const Attendance = sequelize.define("attendance" , {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    date:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM(
            "present",
            "absent"
        ),
        allowNull:false
    }
})

export default Attendance
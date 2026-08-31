import { DataTypes } from "sequelize";
import sequelize from "../config/db.connection.js";

const Comments = sequelize.define("comments",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    comment:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


export default Comments;

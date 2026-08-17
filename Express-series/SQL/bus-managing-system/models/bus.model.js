const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db.connection");

const Bus = sequelize.define("bus", {
    id :{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    busNumber:{
        type:DataTypes.INTEGER,
    },
    totalSeats:{
        type:DataTypes.INTEGER,
    },
    availableSeats:{
        type:DataTypes.INTEGER,
    },
});

module.exports=Bus
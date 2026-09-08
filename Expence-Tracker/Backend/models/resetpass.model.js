const {DataTypes, UUIDV4} = require("sequelize")
const sequelize = require("../config/db.connection")

const ResetPass = sequelize.define("Resetpass" , {
    id:{
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
})

module.exports = ResetPass
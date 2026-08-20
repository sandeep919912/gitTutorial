const {DataTypes} = require("sequelize")
const sequelize = require("../config/db.connection")

const Expences = sequelize.define("expence" , {
    id : {
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    productPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.ENUM(
            "food",
            "transportation",
            "entertainment",
            "utilities",
            "others"
        ),
        allowNull:false
    }
})

module.exports = Expences;
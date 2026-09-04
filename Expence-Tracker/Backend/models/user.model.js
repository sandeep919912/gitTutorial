const {DataTypes} = require("sequelize");
const sequelize = require("../config/db.connection")

const Users = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    totalExpense:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
});

module.exports = Users;
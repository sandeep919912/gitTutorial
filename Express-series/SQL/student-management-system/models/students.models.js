const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db.connection");

const Student = sequelize.define(
    "students",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100)
        },

        email: {
            type: DataTypes.STRING(100),
            unique: true
        },

        age: {
            type: DataTypes.INTEGER
        }
    },
    {
        tableName: "students",
        timestamps: false
    }
);

module.exports = Student;

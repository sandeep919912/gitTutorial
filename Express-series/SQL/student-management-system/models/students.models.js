const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db.connection");

const Student = sequelize.define(
    "teachers",
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
        tableName: "teachers",
        timestamps: true
    }
);

module.exports = Student;

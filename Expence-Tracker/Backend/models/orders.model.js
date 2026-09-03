const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection");

const Orders = sequelize.define("orders", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    paymentSessionId: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM(
            "PENDING",
            "SUCCESSFUL",
            "FAILED"
        ),
        defaultValue: "PENDING",
        allowNull: false
    }

}, {
    tableName: "orders",
    timestamps: true
});

module.exports = Orders;
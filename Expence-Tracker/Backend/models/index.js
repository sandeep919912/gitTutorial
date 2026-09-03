const Users = require("./user.model");
const Expences = require("./expences.model");
const Orders = require("./orders.model")

Users.hasMany(Expences , {
    foreeignKey:"userId"
})

Expences.belongsTo(Users , {
    foreeignKey:"userId"
})


Users.hasMany(Orders, {
    foreignKey: "userId"
});

Orders.belongsTo(Users, {
    foreignKey: "userId"
});

module.exports = {
    Users,
    Expences,
    Orders
}
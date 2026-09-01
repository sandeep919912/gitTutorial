const Users = require("./user.model");
const Expences = require("./expences.model")

Users.hasMany(Expences , {
    foreeignKey:"userId"
})

Expences.belongsTo(Users , {
    foreeignKey:"userId"
})

module.exports = {
    Users,
    Expences
}
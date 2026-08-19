const User = require("./user.model")
const Bookings = require("./booking.model")
const Bus = require("./bus.model")

// user->bus
User.hasMany(Bookings)
Bookings.belongsTo(User)

//bus->bookings
Bus.hasMany(Bookings)
Bookings.belongsTo(Bus)


module.exports = {
    User,
    Bookings,
    Bus
}
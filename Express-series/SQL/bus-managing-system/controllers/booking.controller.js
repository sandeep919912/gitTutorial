const { Bookings } = require("../models")

const addUserBookingsWithBus = async (req , res) => {
    try {
        const {userId , busId , seatNumber} = req.body

        const existingBooking = await Bookings.findOne({
            where: {
                busId,
                seatNumber
            }
        });

        if(existingBooking){
            res.status(400).send("seat already booked by someone")
            return
        }

        const booking = await Bookings.create({
            userId,
            busId,
            seatNumber
        })

        res.status(201).json(booking)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports={
    addUserBookingsWithBus
}


const express = require("express");
const { addUserBookingsWithBus } = require("../controllers/booking.controller");

const bookingRouter = express.Router()

bookingRouter.post("/bookings" , addUserBookingsWithBus)

module.exports=bookingRouter;
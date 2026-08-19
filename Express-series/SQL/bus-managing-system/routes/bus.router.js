const express = require("express");
const { addBuses, getBusBySeat, getBusBookings } = require("../controllers/bus.controller");

const busRouter = express.Router()

busRouter.post("/buses" , addBuses)
busRouter.get("/buses/available/:seats" , getBusBySeat)
busRouter.get("/:id/bookings" , getBusBookings)

module.exports=busRouter;
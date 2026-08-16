const express = require("express");
const { addBuses, getBusBySeat } = require("../controllers/bus.controller");

const busRouter = express.Router()

busRouter.post("/buses" , addBuses)
busRouter.get("/buses/available/:seats" , getBusBySeat)

module.exports=busRouter;
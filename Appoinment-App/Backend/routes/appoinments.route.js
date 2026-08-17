const express = require("express");
const { appointUser, getAllAppointedUser, deleteAppoinment } = require("../controllers/appoinment.controller");

const appoinmentRouter = express.Router()

appoinmentRouter.post("/add" , appointUser)
appoinmentRouter.get("/get" , getAllAppointedUser)
appoinmentRouter.delete("/delete/:id" , deleteAppoinment)

module.exports=appoinmentRouter;
const express = require("express")
const {verificationCheck, updatePassword} = require("../controllers/reset-pass.controller")

const router = express.Router()

router.get("/resetpassword/:id" , verificationCheck)
router.post("/resetpassword/:id" , updatePassword)

module.exports = router
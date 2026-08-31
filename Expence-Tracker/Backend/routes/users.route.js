const express = require("express")
const { signup } = require("../controllers/users.controller")

const router = express.Router()

router.post("/signup" , signup)

module.exports = router
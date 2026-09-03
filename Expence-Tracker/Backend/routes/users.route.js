const express = require("express")
const { signup, login, getProfile } = require("../controllers/users.controller");

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/me", getProfile)

module.exports = router
const express = require("express")
const { signup, login, getProfile, verifyEmail } = require("../controllers/users.controller");

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/me", getProfile)
router.post("/verify/email", verifyEmail)

module.exports = router
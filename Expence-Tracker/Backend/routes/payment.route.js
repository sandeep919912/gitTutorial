const express = require("express")
const { createPayment, verifyPayment } = require("../controllers/payments.controller")

const router = express.Router()

router.post("/create-order" , createPayment)
router.post("/verify" , verifyPayment)


module.exports = router
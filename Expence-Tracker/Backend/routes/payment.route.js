const express = require("express")
const { createPayment, verifyPayment } = require("../controllers/payments.controller")

const router = express.Router()

router.post("/create-order" , createPayment)
router.post("/verify" , verifyPayment)
// Cashfree redirects the browser to return_url via GET after payment
router.get("/verify" , verifyPayment)


module.exports = router
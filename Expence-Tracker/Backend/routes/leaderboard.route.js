const express = require("express");
const { checkPremium } = require("../middleware/premiumCheck");
const { leaderBoard } = require("../controllers/leaderboard.controller");

const router = express.Router()

router.get("/get-all-user",checkPremium  , leaderBoard)

module.exports = router
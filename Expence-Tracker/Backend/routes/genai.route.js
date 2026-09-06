const expres = require("express");
const { askToGenAI } = require("../controllers/genai.controller");

const router = expres.Router();

router.post("/ask" , askToGenAI);

module.exports = router;
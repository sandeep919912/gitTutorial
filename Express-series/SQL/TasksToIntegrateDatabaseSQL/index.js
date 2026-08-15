const express = require("express");
const app = express();
const db = require("./utils/dbConnection");
const studentRouter = require("./route/student.routes");

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/students" , studentRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
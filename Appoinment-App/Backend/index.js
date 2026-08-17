const express = require("express");
const db = require("./config/db.connection")
const cors = require("cors")

//models

const appoinmentUser = require("./models/appoinments.model");
const appoinmentRouter = require("./routes/appoinments.route");

const app = express();

app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }
))

app.use(express.json());

app.use("/appoinments" , appoinmentRouter)

db.sync()
  .then(() => {
    app.listen(3000, (err) => {
      console.log("server is running at port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

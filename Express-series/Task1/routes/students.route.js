const express = require("express");
const students = require("../data/student.data");

const studentsRouter = express.Router();

//Get all students
studentsRouter.get("/students", (req, res) => {

  res.send(students.map((student) => student.name));
});


//Get student by ID
studentsRouter.get("/students/:id", (req, res) => {

  if(req.params.id < 1 || req.params.id > students.length) {
    res.status(404).send("Student not found");
    return;
  }

  console.log(students[parseInt(req.params.id) - 1]);
  res.send(`Details of student with ID: ${JSON.stringify(students[parseInt(req.params.id) - 1])}`);
});

module.exports = studentsRouter;

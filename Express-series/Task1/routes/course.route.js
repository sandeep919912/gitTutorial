const express = require('express');
const courses = require('../data/cource.data');

const courseRouter = express.Router();

//Get all courses
courseRouter.get("/courses", (req, res) => {
  res.send(courses.map((course) => course.name));
});

//Get course by ID
courseRouter.get("/courses/:id", (req, res) => {
  if(req.params.id < 1 || req.params.id > courses.length) {
    res.status(404).send("Course not found");
    return;
  }
  res.send(`Details of course with ID: ${JSON.stringify(courses[parseInt(req.params.id) - 1])}`);
});

module.exports = courseRouter;
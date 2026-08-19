const express = require("express");
const { addCourse, addStudentCourses } = require("../controllers/course.controller");

const courseRouter = express.Router()

courseRouter.post("/add" , addCourse)
courseRouter.get("/addStudentCourse" , addStudentCourses)

module.exports=courseRouter;
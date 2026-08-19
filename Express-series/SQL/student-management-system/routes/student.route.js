const express = require("express");
const { addStudents, getAllStudents, updateStudent, deleteStudent, getStudentById, addingValuesOfStudentsWithIdentityCard } = require("../controllers/student.controller");

const studentRouter = express.Router()

studentRouter.post("/add" , addStudents)
studentRouter.get("/getstudents" , getAllStudents)
studentRouter.get("/getbyid/:id" , getStudentById)
studentRouter.put("/update/:id" , updateStudent)
studentRouter.delete("/delete/:id" , deleteStudent)
studentRouter.post("/addStudentWithIdCard" , addingValuesOfStudentsWithIdentityCard)


module.exports=studentRouter;
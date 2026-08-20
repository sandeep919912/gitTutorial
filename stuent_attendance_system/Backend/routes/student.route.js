import express from "express"
import {addStudents , addAttendance, getAllStudentWithAttendanceFilterByDate , getAllStudents} from "../controller/student.controller.js"

const studentRouter = express.Router()

studentRouter.post("/addStudents" , addStudents)
studentRouter.post("/attendance" ,addAttendance )
studentRouter.get("/attendance", getAllStudentWithAttendanceFilterByDate);
studentRouter.get("/students", getAllStudents);

// studentRouter.post("/addStudent" , addStudentsWithAttendance)

export default studentRouter
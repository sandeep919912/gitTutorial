const { Course, Student } = require("../models")

const addCourse = async (req , res)=>{
    try {
        const {name} = req.body
        
        const course  = await Course.create({
            name
        })

        res.status(201).json(course)
    } catch (error) {
        console.log(error.message)
    }
}

const addStudentCourses = async (req , res)=>{
    const {studentId , courseId} = req.body;
    console.log(studentId , courseId)

    const student = await Student.findByPk(studentId)
    console.log(student)
    const course = await Course.findAll({where:{id :courseId}})
    console.log(course)

    await student.addCourse(course)

    res.status(201).json(student,{include:Course})
}

module.exports = {addCourse , addStudentCourses}
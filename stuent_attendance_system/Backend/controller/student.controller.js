import { Attendance, Student } from "../models/index.js";

const addStudents = async (req , res) => {
    try {
        const {name} = req.body;

        const student = await Student.create({
            name
        })

        res.status(201).json(student)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : error.message})
    }
}

const addAttendance = async (req , res) => {
    try {
        const {studentId , date , status} = req.body

         const student = await Student.findByPk(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Create attendance
        const attendance = await Attendance.create({
            studentId,
            date,
            status
        });

        res.status(201).json({
            message: "Attendance added successfully",
            attendance
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : error.message})
    }
}

const getAllStudentWithAttendanceFilterByDate = async (req, res) => {
    try {
        const { date } = req.query;

        const students = await Student.findAll({
            include: [
                {
                    model: Attendance,
                    where: {
                        date
                    },
                    required: false
                }
            ]
        });

        res.status(200).json(students);

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: error.message
        });
    }
};

const getAllStudents = async (req, res) => {
    try {

        const students = await Student.findAll();

        res.status(200).json(students);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: error.message
        });
    }
};

export {addStudents , addAttendance , getAllStudentWithAttendanceFilterByDate, getAllStudents};
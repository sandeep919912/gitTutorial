import Attendance from "./attendance.model.js";
import Student from "./student.model.js";

Student.hasMany(Attendance , {
    foreignKey:"studentId"
})

Attendance.belongsTo(Student , {
    foreignKey:"studentId"
})

export {Student , Attendance}
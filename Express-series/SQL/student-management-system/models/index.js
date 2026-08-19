const Course = require("./course.model")
const Department = require("./department.model")
const IdentityCard = require("./identityCard.model")
const StudentCourse = require("./studentCourse.model")
const Student = require("./students.models")

// one to one

Student.hasOne(IdentityCard)
IdentityCard.belongsTo(Student)

// one to many

Department.hasMany(Student, {
  foreignKey: "departmentId"
});

Student.belongsTo(Department, {
  foreignKey: "departmentId"
});


//many to many
Student.belongsToMany(Course,{through: "studentCourse"})
Course.belongsToMany(Student,{through: "studentCourse"})

module.exports={
    Student,
    IdentityCard,
    Department,
    Course,
    StudentCourse
}

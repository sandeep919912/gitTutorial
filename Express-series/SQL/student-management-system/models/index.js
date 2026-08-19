const Department = require("./department.model")
const IdentityCard = require("./identityCard.model")
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

module.exports={
    Student,
    IdentityCard,
    Department
}

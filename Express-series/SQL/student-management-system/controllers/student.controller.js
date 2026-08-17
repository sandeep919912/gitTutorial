const Student = require("../models/students.models");
const connection = require("../utils/db.connection");

const addStudents = async (req , res)=>{

    try {
        const {name , email ,age } = req.body

        await Student.create(
            {
                name:name,
                email:email,
                age:age
            }
        )

        res.status(201).send(`student with ${name} has been created successfully`)
    } catch (error) {
        console.log(error)
    }
    // const {name , email , age} = req.body;

    // const insertQuery = `
    //     INSERT INTO students (name , email , age) VALUES (?,?,?)
    // `

    // connection.execute(insertQuery , [name , email , age] , (err)=>{
    //     if(err){
    //         console.log(err.message)
    //         return
    //     }

    //     res.status(201).send(`student registered with name ${name}`)
    // })
}


const getAllStudents = (req , res) => {
    const getAllStudentsQuery = `
        SELECT * FROM students
    `
    connection.execute(getAllStudentsQuery , (err , result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            return;
        }

        console.log("getting all students successfull")
        res.status(200).json(result)
    })
}

const getStudentById = (req, res) => {
    const { id } = req.params;

    const getQuery = `
        SELECT * FROM students
        WHERE id = ?
    `;

    connection.execute(getQuery, [id], (err, result) => {
        if (err) {
            console.log("GET STUDENT ERROR:", err.message);

            return res.status(500).json({
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(result[0]);
    });
};


const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
        const [updatedRows] = await Student.update(
            {
                name,
                email,
                age
            },
            {
                where: {
                    id
                }
            }
        );

        if (updatedRows === 0) {
            console.log(`UPDATE FAILED: Student with id ${id} not found`);

            return res.status(404).json({
                message: "Student not found"
            });
        }

        console.log(`UPDATE: Student ${id} updated successfully`);

        res.status(200).json({
            message: "Student updated successfully"
        });

    } catch (error) {
        console.log("UPDATE ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await Student.destroy({
            where: {
                id: id
            }
        });

        if (deletedRows === 0) {
            console.log(`DELETE FAILED: Student with id ${id} not found`);

            return res.status(404).json({
                message: "Student not found"
            });
        }

        console.log(`DELETE: Student ${id} deleted successfully`);

        res.status(200).json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        console.log("DELETE ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });
    }

};

module.exports={addStudents , getAllStudents,getStudentById , updateStudent , deleteStudent}
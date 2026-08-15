const connection = require("../utils/dbConnection");

const addEntries = (req , res)=>{
    // res.send("successfully done")

    const {id,name,email} = req.body

    const entries = `
        INSERT INTO students (id , name , email) VALUES (?,?,?)
    `

    connection.execute(entries , [id,name,email] , (err)=>{
        if(err){
            console.log(err)
            res.status(500).send(err.message)
            connection.end()
            return 
        }

        res.status(200).send(`successfully student register with name ${name}`)
    })
}

const updateEntries = (req , res) => {
    const {id} = req.params;
    const {name , email} = req.body;

    const updateQuery = `
        UPDATE students SET name=?,email=? WHERE id=?
    `

    connection.execute(updateQuery , [name , email , id] , (err , result) =>{
        if(err){
            console.log(err)
            res.status(500).send(err.message)
            connection.end()
            return;
        }

        if(result.affectedRows === 0) {
            res.status(404).send("student not found")
        }

        res.status(201).send(`student with ${name} updated sucessfully`)
    })
}

const deleteEntries = (req , res)=>{
    const {id} = req.params;
    
    const deleteQuery = `
        DELETE FROM students WHERE id=?
    `

    connection.execute(deleteQuery , [id] , (err , result)=>{
        if(err){
            console.log(err)
            res.status(500).send(err.message)
            return;
        }

        if(result.affectedRows === 0){
            res.status(404).send("student not found")
            return;
        }

        res.status(200).send(`student has been deleted`)
    })
}

module.exports={addEntries , updateEntries , deleteEntries};
const User = require("../models/appoinments.model")

const appointUser =async (req,res)=>{
    try {
        const {name , email} = req.body
    
        await User.create({
            name,
            email
        })

        res.status(201).send(`user is created name ${name}`)
    } catch (error) {
        console.log(err)
    }

}

const getAllAppointedUser = async (req,res)=>{
    try {
        const result = await User.findAll()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

const deleteAppoinment = async (req , res)=>{
    const {id} = req.params
    try {
        await User.destroy({where:{id}})
        res.status(200).send(`user with ${id} has been deleted from database`)
    } catch (error) {
        console.log(error)
    }
}

module.exports={appointUser , getAllAppointedUser , deleteAppoinment}
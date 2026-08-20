import { Sequelize } from "sequelize";

const sequelize = new Sequelize("student_attendance" , "root" , "Rootpass@123" , {
    host:"localhost",
    dialect:"mysql"
});

(async ()=>{
    try {
        await sequelize.authenticate();
        console.log("database is connected successfully")
    } catch (error) {
        console.error(error.message)
    }
})()


export default sequelize;
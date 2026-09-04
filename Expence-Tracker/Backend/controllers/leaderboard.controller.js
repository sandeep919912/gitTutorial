const Expences = require("../models/expences.model")
const Users = require("../models/user.model")

const leaderBoard = async (req , res) => {
    try {
        const users = await Users.findAll({
            include:{
                model:Expences,
                attributes:["productPrice"]
            }
        })

        const leaderBoard = users.map((user) => {
            const totalExpence = user.expences.reduce((total , expence) => {
                return total + Number(expence.productPrice)
            }, 0)

            return {
                id: user.id,
                name:user.name,
                totalExpence
            }
        })


        leaderBoard.sort((a, b) => b.totalSpent - a.totalSpent);

        return res.status(200).json({
            leaderBoard
        });


    } catch (error) {
          return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

module.exports = {leaderBoard}
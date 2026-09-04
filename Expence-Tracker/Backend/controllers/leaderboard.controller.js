const { fn, col } = require("sequelize");


const Expences = require("../models/expences.model");
const Users = require("../models/user.model");

const leaderBoard = async (req, res) => {
  try {

        const leaderBoard = await Users.findAll({
            attributes: [
                "id",
                "name",
                "totalExpense"
            ],

            // raw: true
        });

        return res.status(200).json({
            leaderBoard
        });

    } catch (error) {

        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });

    }
};

module.exports = { leaderBoard };

const connection = require("../utils/db.connection");
  const { Op } = require("sequelize");
const Bus = require("../models/bus.model");

const addBuses = async (req, res) => {
  //id , busnumber , totalseats , availableseats

  const { id, busNumber, totalSeats, availableSeats } = req.body;

  try {
        const bus = await Bus.create({
            busNumber,
            totalSeats,
            availableSeats
        });

        console.log(`INSERT: Bus ${busNumber} created successfully`);

        res.status(201).json({
            message: `Bus number ${busNumber} has been registered`,
            bus
        });

    } catch (error) {
        console.log("INSERT BUS ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });
    }
};

const getBusBySeat = async (req, res) => {


    const { seats } = req.params;

    try {
        const buses = await Bus.findAll({
            where: {
                availableSeats: {
                    [Op.gte]: seats
                }
            }
        });

        if (buses.length === 0) {
            return res.status(404).json({
                message: "No bus available with enough seats"
            });
        }

        res.status(200).json(buses);

    } catch (error) {
        console.log("GET BUS ERROR:", error.message);

        res.status(500).json({
            message: error.message
        });
    }

};

module.exports = { addBuses  , getBusBySeat};

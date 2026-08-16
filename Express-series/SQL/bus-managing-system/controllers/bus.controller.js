const connection = require("../utils/db.connection");

const addBuses = (req, res) => {
  //id , busnumber , totalseats , availableseats

  const { id, busNumber, totalSeats, availableSeats } = req.body;

  const addBusQuery = `
        INSERT INTO bus (id , busNumber , totalSeats , availableSeats) VALUES (?,?,?,?)
    `;

  connection.execute(
    addBusQuery,
    [id, busNumber, totalSeats, availableSeats],
    (err) => {
      if (err) {
        console.log(err);
        return;
      }

      res.status(201).send(`bus number ${busNumber} has been registerd`);
    },
  );
};

const getBusBySeat = (req, res) => {
  const { seats } = req.params;

  const getQuerybySeats = `
        SELECT * FROM bus WHERE availableSeats >= ?
    `;

  connection.execute(getQuerybySeats, [seats], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "No bus available with enough seats",
      });
    }
    res.status(200).json(result);
  });
};

module.exports = { addBuses  , getBusBySeat};

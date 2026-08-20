const { where } = require("sequelize");
const Expences = require("../models/expences.model");

const addExpences = async (req, res) => {
  try {
    const { productPrice, description, category } = req.body;

    const registerProduct = await Expences.create({
      productPrice,
      description,
      category,
    });

    res.status(201).json(registerProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const getExpences = async (req, res) => {
  try {
    const totalExpences = await Expences.findAll();
    res.status(200).json(totalExpences);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteExpences = async (req, res) => {
  try {
    const { id } = req.params;

    await Expences.destroy({
      where: { id },
    });

    res.status(200).json({
            message: `Expense with ${id} has been deleted`
        });

  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  addExpences,
  getExpences,
  deleteExpences,
};

const { where, Transaction } = require("sequelize");
const Expences = require("../models/expences.model");
const jwt = require("jsonwebtoken");
const Users = require("../models/user.model");
const sequelize = require("../config/db.connection");

const addExpences = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userId = decoded.userId;

    // console.log("user id in add expenses:", userId);

    const { productPrice, description, category } = req.body;

    const registerProduct = await Expences.create(
      { productPrice, description, category, userId },

      { transaction: transaction },
    );

    await Users.increment(
      { totalExpense: Number(productPrice) },
      { where: { id: userId }, transaction: transaction },
    );

    await transaction.commit();
    res.status(201).json(registerProduct);
  } catch (error) {
    console.log(error.message);
    await transaction.rollback();
    res.status(500).json({
      message: error.message,
    });
  }
};

const getExpencesForUser = async (req, res) => {
  
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userId = decoded.userId;

    const userExpences = await Expences.findAll({
      where: { userId },
    });

    // console.log("User Expenses:", userExpences);

    res.status(200).json(userExpences);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteExpences = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;

    const expense = await Expences.findOne({
      where: { id },
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Remove amount from user's totalExpense

    if (expense.productPrice >= 0) {
      await Users.decrement(
        { totalExpense: Number(expense.productPrice) },
        { where: { id: expense.userId }, transaction: transaction },
      );
    }

    // Delete expense
    await Expences.destroy({
      where: { id },
      transaction: transaction,
    });

    res.status(200).json({
      message: `Expense with ${id} has been deleted`,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addExpences,
  getExpencesForUser,
  deleteExpences,
};

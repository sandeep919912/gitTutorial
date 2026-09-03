const jwt = require("jsonwebtoken");
const { Users, Orders } = require("../models/index");
const { createOrder, getPaymentStatus } = require("../services/cashFreeServices");

const createPayment = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(500).json({ message: "token is missing" });
    }

    // const token = authHeader.split("")[1];

    
    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userId = decoded.userId;

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const orderId = `ORDER_${userId}_${Date.now()}`;

    const orderAmount = 599;
    const orderCurrency = "INR";

    const cashfreeOrder = await createOrder(
      orderId,
      orderAmount,
      orderCurrency,
      String(userId),
      "9199124294",
    );

    await Orders.create({
      orderId,

      userId,

      amount:orderAmount,

      paymentSessionId: cashfreeOrder.payment_session_id,

      status: "PENDING",
    });

    res.status(201).json({
      orderId,
      paymentSessionId: cashfreeOrder.payment_session_id,
    });


  } catch (error) {
    console.error(
      "CREATE PAYMENT ERROR:",
      error.response?.data || error.message,
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
    console.log("here..........................................................................................")
    try {

        // Cashfree sends order_id in query parameter
        const { order_id } = req.query;

        console.log("Order ID received:", order_id);

        if (!order_id) {
            return res.status(400).json({
                message: "Order ID is required"
            });
        }

        // Find our order in MySQL
        const order = await Orders.findOne({
            where: {
                orderId: order_id
            }
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // Ask Cashfree for payment status
        const payments = await getPaymentStatus(order_id);

        console.log("Cashfree payments:", payments);

        if (!payments || payments.length === 0) {
            return res.status(404).json({
                message: "Payment details not found"
            });
        }

        const payment = payments[0];

        // Payment successful
        if (payment.payment_status === "SUCCESS") {

            await order.update({
                status: "SUCCESSFUL"
            });

            return res.json({
                status: "SUCCESSFUL",
                message: "Payment successful"
            });
        }

        // Payment failed
        if (payment.payment_status === "FAILED") {

            await order.update({
                status: "FAILED"
            });

            return res.json({
                status: "FAILED",
                message: "Payment failed"
            });
        }

        // Payment pending
        return res.json({
            status: "PENDING",
            message: "Payment is still pending"
        });

    } catch (error) {

        console.error(
            "VERIFY PAYMENT ERROR:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Payment verification failed"
        });
    }
};

module.exports = {
  createPayment,
  verifyPayment
};

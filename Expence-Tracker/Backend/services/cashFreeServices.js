const {Cashfree , CFEnvironment }  = require("cashfree-pg")

const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
)

const createOrder = async(
    orderId,
    orderAmount,
    orderCurrency,
    customerId,
    customerPhone
) => {
    try {
        const request = {

            "order_id": orderId,

            "order_amount": orderAmount,

            "order_currency": orderCurrency,

            "customer_details": {
                "customer_id": customerId,
                "customer_phone": customerPhone
            },

            "order_meta": {
                "return_url": `http://localhost:5500/payments/verify?order_id=${orderId}`,
                "payment_methods": "cc,dc,upi"
            }
        };

        const response = await cashfree.PGCreateOrder(request)

        console.log(response.data)

        return response.data
    } catch (error) {
         console.error(
            "Cashfree Create Order Error:",
            error.response?.data || error.message
        );

        throw error;
    }
}

const getPaymentStatus = async (orderId) => {
    try {

        const response = await cashfree.PGOrderFetchPayments(orderId);

        console.log("Cashfree Payment Status Response:", response);

        return response.data;

    } catch (error) {

        console.error(
            "Cashfree Payment Status Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

module.exports = {
    createOrder,
    getPaymentStatus
}
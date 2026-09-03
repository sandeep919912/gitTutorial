const API_URL = "http://localhost:3000/expences";

// ===============================
// GET ALL EXPENSES
// ===============================
async function getExpenses() {
  try {
    const token = localStorage.getItem("token") || "";

    if (!token) {
      window.location.href = "login.html";
      alert("Please log in to add expenses.");
      return;
    }

    const response = await axios.get(`${API_URL}/get`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response);

    displayExpenses(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

// ===============================
// ADD EXPENSE
// ===============================
async function handleAddExpense(event) {
  event.preventDefault();

  const productPrice = document.getElementById("expenseInput").value;
  const description = document.getElementById("descriptionInput").value;
  const category = document.getElementById("categorySelect").value;
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in to add expenses.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/expences/add",
      {
        productPrice,
        description,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = response.data;

    // Clear form
    document.getElementById("expenseForm").reset();

    // Refresh expense list
    getExpenses();
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
}

// ===============================
// DISPLAY EXPENSES
// ===============================
function displayExpenses(expenses) {
  const expenseList = document.getElementById("expenseList");
  const totalExpense = document.getElementById("totalExpense");

  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach((expense) => {
    total += Number(expense.productPrice);

    const li = document.createElement("li");

    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
            <div>
                <strong>₹${expense.productPrice}</strong>
                <br>
                <small>${expense.description}</small>
                <br>
                <span class="badge bg-secondary">
                    ${expense.category}
                </span>
            </div>

            <button
                class="btn btn-danger btn-sm"
                onclick="deleteExpense(${expense.id})"
            >
                Delete
            </button>
        `;

    expenseList.appendChild(li);
  });

  totalExpense.textContent = total;
}

// ===============================
// DELETE EXPENSE
// ===============================
async function deleteExpense(id) {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);

    const data = response.data;

    console.log(data);

    // Refresh list
    getExpenses();
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
}

const API = "http://localhost:3000/payments";

const premiumBtn = document.querySelector(".premium");

const cashfree = Cashfree({
  mode: "sandbox",
});
premiumBtn.addEventListener("click", async () => {

  const res = await axios.post(
    `${API}/create-order`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  // console.log("Backend response:", res.data.paymentSessionId);

  let checkoutOptions = {
    paymentSessionId: res.data.paymentSessionId,
    redirectTarget: "_modal",
  };
  cashfree.checkout(checkoutOptions).then((result) => {
    if (result.error) {
      // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
      console.log(
        "User has closed the popup or there is some payment error, Check for Payment Status",
      );
      console.log(result.error);
    }
    if (result.redirect) {
      // This will be true when the payment redirection page couldnt be opened in the same window
      // This is an exceptional case only when the page is opened inside an inAppBrowser
      // In this case the customer will be redirected to return url once payment is completed
      console.log("Payment will be redirected");
    }
    if (result.paymentDetails) {
      // This will be called whenever the payment is completed irrespective of transaction status
      console.log("Payment has been completed, Check for Payment Status");
      console.log(result.paymentDetails.paymentMessage);
    }
  });
});

// const token = localStorage.getItem("token");

// const cashfree = Cashfree({
//     mode: "sandbox"
// });

// premiumBtn.addEventListener("click", async () => {

//     try {

//         // 1. Ask our backend to create a Cashfree order
//         const res = await axios.post(
//             `${API}/create-order`,
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );

//         console.log("Backend response:", res.data);

//         // 2. Get payment session ID
//         const paymentSessionId = res.data.paymentSessionId;

//         // 3. Open Cashfree checkout
//         const result = await cashfree.checkout({
//             paymentSessionId: paymentSessionId,
//             redirectTarget: "_modal"
//         });

//         console.log("Checkout result:", result);

//     } catch (error) {

//         console.log(
//             error.response?.data || error.message
//         );

//     }

// });

// ===============================
// LOAD EXPENSES WHEN PAGE LOADS
// ===============================
getExpenses();

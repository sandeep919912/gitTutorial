const API_URL = "http://localhost:3000/expences";

// ===============================
// GET ALL EXPENSES
// ===============================
async function getExpenses() {
  try {
    const response = await axios.get(`${API_URL}/get` , {
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
    const response = await axios.delete(`${API_URL}/delete/${id}`)

    const data =  response.data;

    console.log(data);

    // Refresh list
    getExpenses();
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
}

// ===============================
// LOAD EXPENSES WHEN PAGE LOADS
// ===============================
getExpenses();

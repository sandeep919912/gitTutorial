const API_URL = "http://localhost:3000/expences";

const select = document.querySelector(".row-options");

let currentPage = 1;
let totalPages = 1;

async function getExpenses(page = 1) {
  try {
    const token = localStorage.getItem("token") || "";

    if (!token) {
      window.location.href = "login.html";
      alert("Please log in to add expenses.");
      return;
    }

    const limit = Number(select.value);

    const response = await axios.get(
      `${API_URL}/get?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", response.data);

    currentPage = response.data.currentPage;
    totalPages = response.data.totalPages;

    updatePagination();

    await getUser();

    const isPremium = localStorage.getItem("isPremium");

    console.log("Premium:", isPremium);

    if (isPremium === "true") {
      document.getElementById("premiumBtn").textContent =
        "You are a Premium User!";

      document.getElementById("premiumBtn").disabled = true;
    }

    displayExpenses(response.data.expenses);

  } catch (error) {
    console.log(error.message);
  }
}

select.addEventListener("change", () => {
  currentPage = 1;
  getExpenses(1);
});

function updatePagination() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageNumber = document.getElementById("pageNumber");

  pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    getExpenses(currentPage - 1);
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentPage < totalPages) {
    getExpenses(currentPage + 1);
  }
});

getExpenses();

async function handleAddExpense(event) {
  event.preventDefault();

  const productPrice =
    document.getElementById("expenseInput").value;

  const description =
    document.getElementById("descriptionInput").value;

  const category =
    document.getElementById("categorySelect").value;

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
      }
    );

    console.log(response.data);

    document.getElementById("expenseForm").reset();

    getExpenses(currentPage);

  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
}

function displayExpenses(expenses) {
  const expenseList =
    document.getElementById("expenseList");

  const totalExpense =
    document.getElementById("totalExpense");

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

async function deleteExpense(id) {
  try {
    const response = await axios.delete(
      `${API_URL}/delete/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data);

    getExpenses(currentPage);

  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
}

const getUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "login.html";

      alert(
        "Please log in to access this page."
      );

      return;
    }

    const response = await axios.get(
      "http://localhost:3000/users/me",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    const user = response.data.user;

    console.log(
      "Premium status:",
      user.isPremium
    );

    localStorage.setItem(
      "isPremium",
      user.isPremium
    );

  } catch (error) {
    console.error(
      "Error fetching user data:",
      error
    );
  }
};

//cashfreee

const API = "http://localhost:3000/payments";

const premiumBtn =
  document.querySelector("#premiumBtn");

const cashfree =
  Cashfree({
    mode: "sandbox",
  });

premiumBtn.addEventListener(
  "click",
  async () => {
    try {
      const res = await axios.post(
        `${API}/create-order`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const checkoutOptions = {
        paymentSessionId:
          res.data.paymentSessionId,

        redirectTarget: "_modal",
      };

      cashfree
        .checkout(checkoutOptions)
        .then(async (result) => {

          if (result.error) {
            console.log(
              "User closed the popup or payment error",
              result.error
            );
          }

          if (result.redirect) {
            console.log(
              "Payment will be redirected"
            );
          }

          if (result.paymentDetails) {
            console.log(
              "Payment completed"
            );

            console.log(
              result.paymentDetails.paymentMessage
            );

            try {
              const verifyRes =
                await axios.post(
                  `${API}/verify`,
                  {},
                  {
                    params: {
                      order_id:
                        res.data.orderId,
                    },

                    headers: {
                      Authorization:
                        `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );

              if (
                verifyRes.data.status ===
                "SUCCESS"
              ) {
                alert(
                  "Payment successful! You are now a premium user."
                );

                localStorage.setItem(
                  "isPremium",
                  "true"
                );

                premiumBtn.textContent =
                  "You are a Premium User!";

                premiumBtn.disabled = true;
              }

              console.log(
                "Payment verification result:",
                verifyRes.data
              );

            } catch (error) {
              console.log(
                "Payment verification failed:",
                error.response?.data ||
                error.message
              );
            }
          }
        });

    } catch (error) {
      console.log(
        error.response?.data ||
        error.message
      );
    }
  }
);

const expencesBtn =
  document.querySelector("#forPremium");

const leaderBoard =
  document.querySelector(".leaderboard");

expencesBtn.addEventListener(
  "click",
  async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/leaderboard/get-all-user",
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const allUserExpences =
        res.data.leaderBoard;

      leaderBoard.textContent = "";

      const closeBtn =
        document.createElement("button");

      closeBtn.textContent = "×";

      closeBtn.classList.add(
        "close-leaderboard"
      );

      closeBtn.addEventListener(
        "click",
        () => {
          leaderBoard.style.display =
            "none";
        }
      );

      leaderBoard.appendChild(closeBtn);

      allUserExpences.forEach(
        (user, index) => {

          const userDiv =
            document.createElement("div");

          userDiv.innerHTML = `
            <h3>
              ${index + 1}. ${user.name}
            </h3>

            <p>
              Total Expense:
              ₹${user.totalExpense}
            </p>
          `;

          leaderBoard.appendChild(userDiv);
        }
      );

      leaderBoard.style.display =
        "block";

    } catch (error) {
      alert(error.message);
    }
  }
);
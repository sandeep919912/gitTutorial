const expenseInput = document.getElementById("expenseInput");
const addExpenseBtn = document.getElementById("addExpenseButton");
const expenseList = document.getElementById("expenseList");
const totalExpense = document.getElementById("totalExpense");
const category = document.getElementById("categorySelect");
const descriptionInput = document.getElementById("descriptionInput");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = null;

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Calculate Total
function updateTotal() {
    let total = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    totalExpense.textContent = total;
}

function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.className = "expense-item";

        li.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            deleteExpense(index);
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", () => {
            editExpense(index);
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        expenseList.appendChild(li);
    });

    updateTotal();
}

function handleAddExpense(event) {
    event.preventDefault();

    const amount = expenseInput.value;
    const description = descriptionInput.value;
    const categoryValue = category.value;

    if (!amount || !description) {
        alert("Please fill all fields");
        return;
    }

    const expense = {
        amount,
        description,
        category: categoryValue,
    };

    if (editIndex !== null) {
        expenses[editIndex] = expense;
        editIndex = null;
        addExpenseBtn.textContent = "Add Expense";
    } else {
        expenses.push(expense);
    }

    saveToLocalStorage();
    renderExpenses();

    expenseInput.value = "";
    descriptionInput.value = "";
    category.selectedIndex = 0;
}

// Delete Expense
function deleteExpense(index) {
    expenses.splice(index, 1);

    saveToLocalStorage();
    renderExpenses();
}

// Edit Expense
function editExpense(index) {
    const expense = expenses[index];

    expenseInput.value = expense.amount;
    descriptionInput.value = expense.description;
    category.value = expense.category;

    editIndex = index;

    addExpenseBtn.textContent = "Update Expense";
}

addExpenseBtn.addEventListener("click", handleAddExpense);

// Initial Render
renderExpenses();
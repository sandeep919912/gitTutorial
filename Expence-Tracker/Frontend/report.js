const isPremiumUser = true;

const transactions = [
    {
        date: "2026-09-08",
        description: "Salary",
        category: "Salary",
        type: "income",
        amount: 40000
    },
    {
        date: "2026-09-08",
        description: "Milk",
        category: "Food",
        type: "expense",
        amount: 60
    },
    {
        date: "2026-09-08",
        description: "Grocery",
        category: "Food",
        type: "expense",
        amount: 500
    },
    {
        date: "2026-09-07",
        description: "Travel",
        category: "Transport",
        type: "expense",
        amount: 250
    },
    {
        date: "2026-09-06",
        description: "Freelance",
        category: "Work",
        type: "income",
        amount: 5000
    },
    {
        date: "2026-09-05",
        description: "Electricity Bill",
        category: "Utilities",
        type: "expense",
        amount: 1200
    },
    {
        date: "2026-09-04",
        description: "Shopping",
        category: "Shopping",
        type: "expense",
        amount: 1500
    },
    {
        date: "2026-09-02",
        description: "Freelance",
        category: "Work",
        type: "income",
        amount: 3000
    },
    {
        date: "2026-08-25",
        description: "Internet Bill",
        category: "Utilities",
        type: "expense",
        amount: 800
    },
    {
        date: "2026-08-20",
        description: "Freelance",
        category: "Work",
        type: "income",
        amount: 2500
    }
];

const tableBody = document.getElementById("transactionTable");
const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const savings = document.getElementById("savings");
const reportTitle = document.getElementById("reportTitle");
const downloadBtn = document.getElementById("downloadBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "daily";

function formatMoney(amount) {
    return `₹${amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

function formatDate(date) {
    const value = new Date(date);

    return value.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function getToday() {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return today;
}

function getFilteredTransactions(filter) {
    const today = getToday();

    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);

        transactionDate.setHours(0, 0, 0, 0);

        if (filter === "daily") {
            return (
                transactionDate.getFullYear() === today.getFullYear() &&
                transactionDate.getMonth() === today.getMonth() &&
                transactionDate.getDate() === today.getDate()
            );
        }

        if (filter === "weekly") {
            const startOfWeek = new Date(today);

            const day = startOfWeek.getDay();

            startOfWeek.setDate(
                startOfWeek.getDate() - day
            );

            const endOfWeek = new Date(startOfWeek);

            endOfWeek.setDate(
                endOfWeek.getDate() + 6
            );

            return (
                transactionDate >= startOfWeek &&
                transactionDate <= endOfWeek
            );
        }

        if (filter === "monthly") {
            return (
                transactionDate.getFullYear() === today.getFullYear() &&
                transactionDate.getMonth() === today.getMonth()
            );
        }

        return false;
    });
}

function displayTransactions(data) {
    tableBody.innerHTML = "";

    let income = 0;
    let expense = 0;

    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5">No transactions found</td>
            </tr>
        `;

        totalIncome.textContent = formatMoney(0);
        totalExpense.textContent = formatMoney(0);
        savings.textContent = formatMoney(0);

        return;
    }

    data.forEach(transaction => {
        const row = document.createElement("tr");

        let incomeValue = "";
        let expenseValue = "";

        if (transaction.type === "income") {
            income += transaction.amount;
            incomeValue = formatMoney(transaction.amount);
        } else {
            expense += transaction.amount;
            expenseValue = formatMoney(transaction.amount);
        }

        row.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>${incomeValue}</td>
            <td>${expenseValue}</td>
        `;

        tableBody.appendChild(row);
    });

    totalIncome.textContent = formatMoney(income);
    totalExpense.textContent = formatMoney(expense);
    savings.textContent = formatMoney(income - expense);
}

function updateReport() {
    const data = getFilteredTransactions(currentFilter);

    if (currentFilter === "daily") {
        reportTitle.textContent = "Day to Day Expenses";
    }

    if (currentFilter === "weekly") {
        reportTitle.textContent = "Weekly Expenses";
    }

    if (currentFilter === "monthly") {
        reportTitle.textContent = "Monthly Expenses";
    }

    displayTransactions(data);
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        updateReport();
    });
});

function downloadCSV() {
    if (!isPremiumUser) {
        alert("Download is available only for premium users.");
        return;
    }

    const data = getFilteredTransactions(currentFilter);

    if (data.length === 0) {
        alert("No transactions available.");
        return;
    }

    let csv = "Date,Description,Category,Income,Expense\n";

    data.forEach(transaction => {
        const income =
            transaction.type === "income"
                ? transaction.amount
                : "";

        const expense =
            transaction.type === "expense"
                ? transaction.amount
                : "";

        csv += `${transaction.date},"${transaction.description}","${transaction.category}",${income},${expense}\n`;
    });

    const blob = new Blob([csv], {
        type: "text/csv"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${currentFilter}-expenses.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

if (isPremiumUser) {
    downloadBtn.addEventListener("click", downloadCSV);
} else {
    downloadBtn.disabled = true;
    downloadBtn.textContent = "Premium Only";
}

updateReport();
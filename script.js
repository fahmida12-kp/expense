
const form = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");

const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const balanceDisplay = document.getElementById("balance");

let transactions = [];

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const description =
        document.getElementById("description").value;

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    const category =
        document.getElementById("category").value;

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    };

    transactions.push(transaction);

    displayTransactions();
    updateSummary();

    form.reset();
});


function displayTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach(function(transaction) {

        const li = document.createElement("li");

        li.classList.add("transaction");

        const sign =
            transaction.type === "income" ? "+" : "-";

        const textClass =
            transaction.type === "income"
                ? "income-text"
                : "expense-text";

        li.innerHTML = `
            <div class="transaction-info">
                <h4>${transaction.description}</h4>
                <small>${transaction.category}</small>
            </div>

            <div>
                <strong class="${textClass}">
                    ${sign} ₹${transaction.amount}
                </strong>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>
            </div>
        `;

        transactionList.appendChild(li);
    });
}


function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

    });

    const balance = income - expense;

    incomeDisplay.textContent = income;
    expenseDisplay.textContent = expense;
    balanceDisplay.textContent = balance;
}


function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    displayTransactions();
    updateSummary();
}

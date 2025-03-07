async function loadExpenses() {
    const response = await fetch('<http://localhost:8000/expenses>');
    const expenses = await response.json();
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    let total = 0;
    expenses.forEach(exp => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${exp.description} <span class="badge bg-primary rounded-pill">${exp.amount} MMK</span>`;
        expenseList.appendChild(li);
        total += exp.amount;
    });
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

document.getElementById('expenseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    await fetch('<http://localhost:8000/expenses>', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount })
    });
    document.getElementById('expenseForm').reset();
    loadExpenses();
});

loadExpenses();

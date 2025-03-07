const API_URL = 'http://localhost:8000/expenses';  // Changed from "backend" to "localhost"

async function loadExpenses() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Failed to fetch expenses: ${response.status}`);
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
    } catch (error) {
        console.error('Error loading expenses:', error);
    }
}

document.getElementById('expenseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description, amount })
        });
        if (!response.ok) throw new Error(`Failed to add expense: ${response.status}`);
        const result = await response.json();
        console.log('Add expense response:', result);
        document.getElementById('expenseForm').reset();
        loadExpenses();
    } catch (error) {
        console.error('Error adding expense:', error);
    }
});

loadExpenses();
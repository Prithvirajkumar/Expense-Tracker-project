const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const LSTransactions = JSON.parse(localStorage.getItem('transactions'));


let transactions = localStorage.getItem('transactions') !== null ? LSTransactions : [];

// Event listener
form.addEventListener('submit', addTransaction);

// add transaction 
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }

}

// generate random id function 
function generateID() {
    return Math.floor(Math.random() * 100000000)
}

// add transactions to DOM function 
function addTransactionDOM(transaction) {
    // get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    // add class based on value 
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// update balance sheet
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}

// remove transation by ID 
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id != id);
    updateLocalStorage();
    init();
}

// update Local storage 
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// init app 
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
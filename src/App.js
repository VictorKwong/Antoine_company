import React, { useState } from 'react';
import AddExpense from './AddExpense';

function MainMenu() {
  const [currentPage, setCurrentPage] = useState('MainMenu');
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    invoiceNumber: '',
    name: '',
    amount: '',
    tax: '',
    totalAmount: '',
    description: '',
    category: 'utilities',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the changed field is either amount or tax, recalculate totalAmount
      let newTotalAmount = newExpense.totalAmount;
      if (name === 'amount' || name === 'tax') {
        newTotalAmount = (
          parseFloat(name === 'amount' ? value : newExpense.amount || 0) + 
          parseFloat(name === 'tax' ? value : newExpense.tax || 0)
        ).toFixed(2);
      }
    setNewExpense({
        ...newExpense,
        [name]: value,
        totalAmount: newTotalAmount,
    });
  };

  const handleAddExpense = () => {
    if (
      newExpense.invoiceNumber.trim() !== '' &&
      newExpense.name.trim() !== '' &&
      newExpense.amount.trim() !== '' &&
      newExpense.tax.trim() !== '' &&
      newExpense.totalAmount.trim() !== '' &&
      newExpense.description.trim() !== ''
    ) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({
        invoiceNumber: '',
        name: '',
        amount: '',
        tax: '',
        totalAmount: '',
        description: '',
        category: 'utilities',
      });
    }
  };
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
    {currentPage === 'MainMenu' &&
    <div className="container mt-5">
      <h1>Main Menu</h1>
      <p>Welcome to Antoine’s Landscaping Company!</p>
      <button onClick={() => handleNavigate('AddExpense')}>Go to Add Expense</button>
    </div>}

    {currentPage === 'AddExpense' &&
      <div className="container mt-5">
      <div className="container mt-5 text-center">
        <h1>Antoine’s Landscaping Company</h1>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label>Category:</label>
          <select className="form-select" name="category" value={newExpense.category} onChange={handleChange}>
            <option value="utilities">Utilities</option>
            <option value="marketing expenses">Marketing Expenses</option>
            <option value="supplies">Supplies</option>
            <option value="employee payroll">Employee Payroll</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>Invoice Number:</label>
          <input
            className="form-control"
            type="text"
            name="invoiceNumber"
            value={newExpense.invoiceNumber}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <label>Name:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={newExpense.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>Amount:</label>
          <input
            className="form-control"
            type="text"
            name="amount"
            value={newExpense.amount}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <label>Tax:</label>
          <input
            className="form-control"
            type="text"
            name="tax"
            value={newExpense.tax}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <label>Total Amount:</label>
          <input
            className="form-control"
            type="text"
            name="totalAmount"
            value={newExpense.totalAmount}
            onChange={handleChange}
            readOnly
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>Description:</label>
          <input
            className="form-control"
            type="text"
            name="description"
            value={newExpense.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="container text-center">
        <button className="btn btn-primary mt-3 mx-2" onClick={handleAddExpense}>Add Expense</button>
        <button className="btn btn-secondary mt-3 mx-2" onClick={() => handleNavigate('MainMenu')}>Cancel</button>
      </div>

      <div>
        <h2 className="mt-5">Expenses:</h2>
        <ul className="list-unstyled">
          {expenses.map((expense, index) => (
            <li key={index} className="border p-3 mb-3">
              <h3><strong>Invoice Number:</strong> {expense.invoiceNumber}</h3>
              <p><strong>Category:</strong> {expense.category}</p>
              <p><strong>Name:</strong> {expense.name}</p>
              <p><strong>Amount:</strong> {expense.amount}</p>
              <p><strong>Tax:</strong> {expense.tax}</p>
              <p><strong>Total Amount:</strong> {expense.totalAmount}</p>
              <p><strong>Description:</strong> {expense.description}</p>
            </li>
          ))}
        </ul>
      </div>
      </div>


    }


    </div>
  );
}

export default MainMenu;

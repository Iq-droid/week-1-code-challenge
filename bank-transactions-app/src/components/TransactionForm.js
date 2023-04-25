import React, { useState } from 'react';
// import axios from 'axios';

const TransactionForm = ({ addTransaction }) => {
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [amount, setAmount] = useState('');

const handleSubmit = async (event) => {
event.preventDefault();

const newTransaction = {
description,
category,
amount: parseFloat(amount),
date: new Date().toISOString().slice(0, 10),
};


try {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction)
    });
    const data = await response.json();
    addTransaction(data);
    setDescription('');
    setCategory('');
    setAmount('');
  } catch (error) {
    console.error(error);
  }
}
  

return (
<form onSubmit={handleSubmit}>
<div>
<label htmlFor="description">Description:</label>
<input
type="text"
id="description"
value={description}
onChange={(event) => setDescription(event.target.value)}
/>
</div>
<div>
<label htmlFor="category">Category:</label>
<select
id="category"
value={category}
onChange={(event) => setCategory(event.target.value)}
>
<option value="">--Select a category--</option>
<option value="Income">Income</option>
<option value="Housing">Housing</option>
<option value="Transportation">Transportation</option>
<option value="Food">Food</option>
<option value="Entertainment">Entertainment</option>
<option value="Fashion">Fashion</option>
<option value="Gift">Gift</option>
<option value="Other">Other</option>
</select>
</div>
<div>
<label htmlFor="amount">Amount:</label>
<input
type="number"
id="amount"
step="0.01"
value={amount}
onChange={(event) => setAmount(event.target.value)}
/>
</div>
<button type="submit">Add Transaction</button>
</form>
);
};

export default TransactionForm;

import React, { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.log(error));
  }, []);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const filterTransactions = () => {
    return transactions.filter(transaction =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sortTransactions = (criteria) => {
    const sortedTransactions = [...transactions];
    sortedTransactions.sort((a, b) => {
      if (a[criteria] < b[criteria]) {
        return -1;
      }
      if (a[criteria] > b[criteria]) {
        return 1;
      }
      return 0;
    });
    setTransactions(sortedTransactions);
  };

  return (
    <div>
      <h1>My Transactions</h1>
      <TransactionForm addTransaction={addTransaction} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TransactionTable
        transactions={filterTransactions()}
        deleteTransaction={deleteTransaction}
        sortTransactions={sortTransactions}
      />
    </div>
  );
}

export default App;

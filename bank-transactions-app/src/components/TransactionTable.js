import React from "react";
import { useState } from "react";

function TransactionTable({ transactions, deleteTransaction }) {
    const [sortBy, setSortBy] = useState("");
  
    const handleSort = (field) => {
      setSortBy(field);
    };
  
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      } else if (sortBy === 'description') {
        return a.description.localeCompare(b.description);
      } else {
        return 0;
      }
    });
  
    return (
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('category')}>Category</th>
            <th onClick={() => handleSort('description')}>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
              <td>
                <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  export default TransactionTable;
import React from 'react';

function TransactionList({ transactions }) {
  return (
    <div className="transaction-list">
      <h2>Tipos de Transações</h2>
      {transactions.length === 0 ? (
        <p>Nenhuma transação encontrada.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;
import React, { useState, useEffect } from 'react';
import SearchBar from '../ui/SearchBar';
import TransactionList from '../ui/TransactionList';
import { transactionTypes } from '../../data/data';

function MainLayout() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactionTypes);

  useEffect(() => {
    const filtered = transactionTypes.filter(transaction =>
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [searchTerm]);

  return (
    <div className="transaction-manager">
      <h1>Lista de Produtos Transacionais Shipay</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}

export default MainLayout;
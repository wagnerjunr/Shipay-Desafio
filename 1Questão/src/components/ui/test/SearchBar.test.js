import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  test('renderizar o componente de busca', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar searchTerm="" onSearchChange={mockOnChange} />);
    
    const searchInput = screen.getByPlaceholderText('Filtrar transações...');
    
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveClass('search-input');
  });

  test('Chamada da função quando o valor do searchTerm é alteado', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar searchTerm="" onSearchChange={mockOnChange} />);
    const searchInput = screen.getByPlaceholderText('Filtrar transações...');
    
    fireEvent.change(searchInput, { target: { value: 'Cash' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('Cash');
  });

  test('Input exibindo o valor colocado', () => {
    const mockOnChange = jest.fn();
    const testValue = 'Cash In';
    render(<SearchBar searchTerm={testValue} onSearchChange={mockOnChange} />);
    
    const searchInput = screen.getByPlaceholderText('Filtrar transações...');
    
    expect(searchInput).toHaveValue(testValue);
  });
});
import React, { useState, useEffect } from 'react';
import './App.css';

const data = [
  { id: 1, name: "apple", age: 30, email: "apple@gmail.com" },
  { id: 2, name: "tele", age: 25, email: "tele@gmail.com" },
  { id: 3, name: "teja", age: 35, email: "teja@gmail.com" },
  { id: 4, name: "charan", age: 40, email: "charan@gmail.com" },
  { id: 5, name: "varun", age: 28, email: "varun@gmail.com" },
  { id: 6, name: "varshith", age: 50, email: "varshith@gmail.com" },
  { id: 7, name: "vivek", age: 22, email: "vivek@gmail.com" }
];


const App = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ column: null, order: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  useEffect(() => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[sortConfig.column] < b[sortConfig.column]) {
        return sortConfig.order === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.column] > b[sortConfig.column]) {
        return sortConfig.order === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredData(sortedData);
  }, [sortConfig]);

  const handleSort = (column) => {
    let order = 'asc';
    if (sortConfig.column === column && sortConfig.order === 'asc') {
      order = 'desc';
    }
    setSortConfig({ column, order });
  };

  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(query)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="table-container">
      <input type="text" id="filter-input" placeholder="Filter results..." onChange={handleFilter} />
      <table id="data-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('age')}>Age</th>
            <th onClick={() => handleSort('email')}>Email</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="pagination-controls">
        <button
          id="prev-page"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span id="page-info">
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>
        <button
          id="next-page"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredData.length / rowsPerPage)))}
          disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

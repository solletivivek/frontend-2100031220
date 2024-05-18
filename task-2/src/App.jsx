import React, { useState, useEffect } from 'react';
import './App.css';

const data = [
  { id: 1, name: "Aarav Sharma", age: 30, email: "aarav.sharma@example.com" },
  { id: 2, name: "Aaradhya Patel", age: 25, email: "aaradhya.patel@example.com" },
  { id: 3, name: "Aarav Singh", age: 35, email: "aarav.singh@example.com" },
  { id: 4, name: "Advait Desai", age: 40, email: "advait.desai@example.com" },
  { id: 5, name: "Aditi Gupta", age: 28, email: "aditi.gupta@example.com" },
  { id: 6, name: "Ahana Kumar", age: 50, email: "ahana.kumar@example.com" },
  { id: 7, name: "Aisha Mehta", age: 22, email: "aisha.mehta@example.com" }
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

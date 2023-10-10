import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favoris = () => {
    const [allFavorites, setAllFavorites] = useState([]);

  useEffect(() => {
    fetchAllFavorites();
  }, []);

  const fetchAllFavorites = async () => {
    try {
        
      const response = await axios.get('http://localhost:3001/api/job/get_all_favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setAllFavorites(response.data.allFavorites);
    } catch (error) {
      console.error('Error fetching all favorite jobs:', error);
    }
  };
  
  const [currentPage, setCurrentPage] = useState(0); // Start from page 0
  const logsPerPage = 10;
  // Calculate total pages based on log entries
  const pageCount = Math.ceil(allFavorites.length / logsPerPage);

  // Get current log entries based on current page
  const indexOfLastLog = (currentPage + 1) * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = allFavorites.slice(indexOfFirstLog, indexOfLastLog);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5; // Number of page numbers to show before "..."
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 0) {
      startPage = 0;
      endPage = Math.min(maxPageNumbers, pageCount - 1);
    } else if (endPage >= pageCount) {
      endPage = pageCount - 1;
      startPage = Math.max(pageCount - maxPageNumbers, 0);
    }

    if (startPage > 0) {
      pageNumbers.push(0);
    }

    if (startPage > 1) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < pageCount - 2) {
      pageNumbers.push('...');
    }

    if (endPage < pageCount - 1) {
      pageNumbers.push(pageCount - 1);
    }

    return pageNumbers;
  };
  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div><p></p></div>
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">All Favorites</h1>
            </div>
          </div>
        </div>
      </section>
      <div><p></p></div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Favorite Jobs</h3>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>Favoris ID</th>
                        <th>Job ID</th>
                        <th>Title</th>
                        <th>Date added</th>
                        
                        {/* Add more columns as needed */}
                      </tr>
                    </thead>
                    <tbody>
                    {allFavorites.map((favorite) => (
                        <tr key={favorite.favoris_id}>
                            <td>{favorite.favoris_id}</td>
                            <td>{favorite.job_id}</td>
                            <td>{favorite.titles}</td>
                            <td>{favorite.date_added}</td>
                            
                            {/* Add more columns as needed */}
                        </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                  <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                      Previous
                    </button>
                  </li>
                  {getPageNumbers().map((page, index) => (
                    <li
                      className={`page-item ${currentPage === page ? 'active' : ''}`}
                      key={index}
                      onClick={() => (typeof page === 'number' ? handlePageChange(page) : null)}
                    >
                      <button className="page-link">{typeof page === 'number' ? page + 1 : page}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === pageCount - 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Favoris

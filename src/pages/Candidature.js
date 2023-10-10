import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Candidature = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Start from page 0
  const applicationsPerPage = 10;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/get_user_applications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching job applications:', error);
    }
  };

  // Calculate total pages based on job applications
  const pageCount = Math.ceil(applications.length / applicationsPerPage);

  // Get current job applications based on current page
  const indexOfLastApplication = (currentPage + 1) * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);

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
              <h1 className="m-0">Candidature</h1>
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
                  <h3 className="card-title">Job Applications</h3>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>Application ID</th>
                        <th>User Name</th>
                        <th>Job Title</th>
                        <th>Date Applied</th>
                        <th>Number of Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentApplications.map((application) => (
                        <tr key={application.candidature_id}>
                          <td>{application.candidature_id}</td>
                          <td>{application.user_name}</td>
                          <td>{application.job_title}</td>
                          <td>{application.date_applied}</td>
                          <td>{application.number_apply}</td>
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

export default Candidature;
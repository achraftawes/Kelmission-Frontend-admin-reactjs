import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cv = () => {
  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    fetchCvs();
  }, []);

  const fetchCvs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/cv/get_all_cvs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setCvs(response.data);
    } catch (error) {
      console.error('Error fetching CVs:', error);
    }
  };

  //////////////////
  const [currentPage, setCurrentPage] = useState(0); // Start from page 0
  const logsPerPage = 10;
  // Calculate total pages based on log entries
  const pageCount = Math.ceil(cvs.length / logsPerPage);

  // Get current log entries based on current page
  const indexOfLastLog = (currentPage + 1) * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = cvs.slice(indexOfFirstLog, indexOfLastLog);

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
              <h1 className="m-0">CVs</h1>
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
                  <h3 className="card-title">CV List</h3>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Location</th>
                        <th>Work Experience</th>
                        <th>Education</th>
                        <th>Skills</th>
                        <th>Languages</th>
                        <th>Certifications</th>
                        <th>User ID</th>
                        <th>Work Experience Duration</th>
                        <th>Education Duration</th>
                        <th>Profession</th>
                        <th>Facebook</th>
                        <th>Instagram</th>
                        <th>Twitter</th>
                        <th>LinkedIn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cvs.map((cv) => (
                        <tr key={cv.user_id}>
                          <td>{cv.user_id}</td>
                          <td>{cv.prenom}</td>
                          <td>{cv.nom}</td>
                          <td>{cv.email}</td>
                          <td>{cv.phone_number}</td>
                          <td>{cv.localisation}</td>
                          <td>{cv.work_experience}</td>
                          <td>{cv.education}</td>
                          <td>{cv.skills}</td>
                          <td>{cv.languages}</td>
                          <td>{cv.certifications_and_licenses}</td>
                          <td>{cv.user_id}</td>
                          <td>{cv.work_experience_duree}</td>
                          <td>{cv.education_duree}</td>
                          <td>{cv.profession}</td>
                          <td>{cv.facebook}</td>
                          <td>{cv.instagram}</td>
                          <td>{cv.twitter}</td>
                          <td>{cv.linkedin}</td>
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

export default Cv;
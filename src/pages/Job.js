import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // Start from page 0
  const jobsPerPage = 5;

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/get_jobs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (jobId) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/job/delete_job',
        { job_id: jobId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(response.data);

      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset to first page when performing a new search
  };

  const filteredJobs = jobs.filter((job) => {
    const mail = job.mail.toLowerCase();
    const num = job.num.toLowerCase();
    const speciality = job.speciality.toLowerCase();
    const search = searchTerm.toLowerCase();

    return mail.includes(search) || num.includes(search) || speciality.includes(search);
  });

  // Calculate total pages based on filtered jobs
  const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);

  // Get current jobs based on current page
  const indexOfLastJob = (currentPage + 1) * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

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
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.split(' ').slice(0, maxLength).join(' ');
    return `${truncatedText} ...`;
  };

  return (

    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
        <div><p></p></div>
          <div className="row mb-2">
            
            <div className="col-sm-6">
              <h1 className="m-0">Table Jobs</h1>
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
                  <h3 className="card-title">Job Listings</h3>
                  <div className="card-tools">
                  <div className="input-group input-group-sm" style={{ width: 150 }}>
                <input
                  type="text"
                  name="table_search"
                  className="form-control float-right"
                  placeholder="Search by Mail, Num, or Speciality"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-default">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>

                  </div>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Mail</th>
                        <th>Num</th>
                        <th>Speciality</th>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentJobs.map((job) => (
                        <tr key={job.job_id}>
                          <td>{job.job_id}</td>
                          <td>{job.mail}</td>
                          <td>{job.num}</td>
                          <td>{job.speciality}</td>
                          <td>{job.company_name}</td>
                          <td>{truncateText(job.titles, 8)}</td> 
                          <td>
                            <button className="btn btn-block bg-gradient-danger" onClick={() => deleteJob(job.job_id)}>
                              Delete
                            </button>
                            <div><p></p></div>
                            <Link to={`/admin/job/${job.job_id}`}>
                              <button className="btn btn-block bg-gradient-info">Show</button>
                            </Link>
                          </td>
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
      
      <div>
        <div><p></p></div>
        <div style={{ margin: '20px 0' }}></div> {/* This adds vertical space */}
        <div><p></p></div>
        <div style={{ margin: '20px 0' }}></div> {/* This adds vertical space */}
        <div><p></p></div>
        <div style={{ margin: '20px 0' }}></div> {/* This adds vertical space */}
        <div><p> .</p></div><div style={{ margin: '20px 0' }}></div> {/* This adds vertical space */}
        <div><p> .</p></div><div style={{ margin: '20px 0' }}></div> {/* This adds vertical space */}
        <div><p> .</p></div><div style={{ margin: '20px 0' }}></div> {/* This adds vertical space */}
        <div><p> .</p></div>
      </div>

      
    </div>
  );
};

export default Job;
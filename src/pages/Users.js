import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/auth/search', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching users.');
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const deactivateUser = async (email) => {
      try {
        await axios.put(
          'http://localhost:3001/api/auth/deactivate',
          { email },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
  
        fetchUsers();
      } catch (error) {
        console.error('Error deactivating user account:', error);
      }
    };
  
    const activateUser = async (email) => {
      try {
        await axios.put(
          'http://localhost:3001/api/auth/activate',
          { email },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
  
        fetchUsers();
      } catch (error) {
        console.error('Error activating user account:', error);
      }
    };
  
    const deleteUser = async (email) => {
      try {
        await axios.delete('http://localhost:3001/api/auth/delete', {
          data: { email },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
  
    const changeUserRole = async (email) => {
      try {
        await axios.put(
          'http://localhost:3001/api/auth/toggle-role',
          { email },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
  
        fetchUsers();
      } catch (error) {
        console.error('Error updating user role:', error);
      }
    };
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredUsers = users.filter((user) => {
      const name = user.name.toLowerCase();
      const email = user.email.toLowerCase();
      const search = searchTerm.toLowerCase();
  
      return name.includes(search) || email.includes(search);
    });
  
    const getRoleLabel = (role) => {
      return role === 1 ? 'admin' : 'user';
    };
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      }
      return text.slice(0, maxLength) + '...';
    };

    ///////////////////////////////////
    const [currentPage, setCurrentPage] = useState(0); // Start from page 0
    const logsPerPage = 10;
    // Calculate total pages based on log entries
    const pageCount = Math.ceil(users.length / logsPerPage);
  
    // Get current log entries based on current page
    const indexOfLastLog = (currentPage + 1) * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = users.slice(indexOfFirstLog, indexOfLastLog);
  
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
                <h1 className="m-0">User Profile</h1>
              </div>
              <div><p></p></div>
              
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">User Details</h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    {loading && <div>Loading...</div>}
                    {filteredUsers.length > 0 && (
                      <table className="table table-hover text-nowrap">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Active</th>
                            <th>Role</th>
                            <th>CV ID</th>
                            <th>Verified Email</th>
                            <th>Inscription Date</th>
                            <th>Motivation Letter</th>
                            <th>Actions</th>
                            <th>Profile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user.user_id}>
                              <td>{user.user_id}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.active.toString()}</td>
                              <td>{getRoleLabel(user.role)}</td>
                              <td>{user.cv_id}</td>
                              <td>{user.verified_email.toString()}</td>
                              <td>{user.date_inscription}</td>
                              <td>{truncateText(user.motivation_letter, 5)}</td> {/* Truncate the motivation letter */}
                              <td>
                                {user.active ? (
                                  <>
                                    <button className="btn btn-block bg-gradient-warning" onClick={() => deactivateUser(user.email)}>
                                      Deactivate
                                    </button>
                                    <button className="btn btn-block bg-gradient-primary" onClick={() => changeUserRole(user.email)}>
                                      Change Role
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button className="btn btn-block bg-gradient-info" onClick={() => activateUser(user.email)}>
                                      Activate
                                    </button>
                                    <button className="btn btn-block bg-gradient-danger" onClick={() => deleteUser(user.email)}>
                                      Delete
                                    </button>
                                  </>
                                )}
                              </td>
                              <td>
                                <Link to={`/admin/users/${user.user_id}`} className="btn btn-app">
                                  <i className='fas fa-users'> </i>
                                  User Profile
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {filteredUsers.length === 0 && <div>No users found.</div>}
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
  
  export default Users;
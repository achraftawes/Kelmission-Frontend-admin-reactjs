import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0); // State variable to store the number of users

//////////////////////////////////////////////
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/auth/search', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
//////////////////////////////////////////////
  // Update the user count based on the users array length
  useEffect(() => {
    setUserCount(users.length);
  }, [users]);

  const [jobCount, setJobCount] = useState(0);

  const fetchJobCount = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/get_jobs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setJobCount(response.data.length);
    } catch (error) {
      console.error('Error fetching job count:', error);
    }
  };
  

  useEffect(() => {
    fetchJobCount();
  }, []);

//////////////////////////////////////////////
  const [adminProfile, setAdminProfile] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const adminResponse = await axios.get('http://localhost:3001/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (adminResponse.status === 200) {
          setAdminProfile(adminResponse.data);
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };

    fetchAdminProfile();
  }, []);

//////////////////////////////////////////////
  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = users.filter((user) => {
    const name = user.name.toLowerCase();
    const email = user.email.toLowerCase();
    const search = searchTerm.toLowerCase();

    return name.includes(search) || email.includes(search);
  });

//////////////////////////////////////////////
  const [logCount, setLogCount] = useState(0);

  const fetchLogCount = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/get_logs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLogCount(response.data.length);
    } catch (error) {
      console.error('Error fetching Log count:', error);
    }
  };
  

  useEffect(() => {
    fetchLogCount();
  }, []);

//////////////////////////////////////////////
  
//////////////////////////////////////////////
const [applyCount, setApplyCount] = useState(0);

  const fetchApplyCount = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/get_user_applications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setApplyCount(response.data.length);
    } catch (error) {
      console.error('Error fetching Favoris count:', error);
    }
  };
  

  useEffect(() => {
    fetchApplyCount();
  }, []);

//////////////////////////////////////////////
const [messageCount, setMessageCount] = useState(0);

  const fetchMessageCount = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/get_messages', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessageCount(response.data.length);
    } catch (error) {
      console.error('Error fetching Message count:', error);
    }
  };
  

  useEffect(() => {
    fetchMessageCount();
  }, []);
/////////////////////////////////////////////////
const [jobs, setJobs] = useState([]);
  const [top5Locations, setTop5Locations] = useState([]); // State variable to store the top 5 locations with the most jobs

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/get_jobs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setJobs(response.data);

      // Calculate and set the top 5 locations
      const top5 = countJobsByLocation(response.data).slice(0, 5);
      setTop5Locations(top5);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // ... rest of your code ...

  // Function to count jobs by location
  const countJobsByLocation = (jobs) => {
    const locationCounts = {};

    // Iterate through jobs and count them by location
    jobs.forEach((job) => {
      const location = job.localisation;

      if (location in locationCounts) {
        locationCounts[location] += 1;
      } else {
        locationCounts[location] = 1;
      }
    });

    // Sort the location counts in descending order
    const sortedLocationCounts = Object.entries(locationCounts).sort(
      (a, b) => b[1] - a[1]
    );

    return sortedLocationCounts;
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
   
    <div className="content-wrapper">
          
    <section className="content">
      <div className="container-fluid">
        <div><p></p></div>
          <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Home page</h1>
              </div>
              
          </div>

        <div className="row">
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box">
              <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog"></i></span>

              <div className="info-box-content">
                <span className="info-box-text">Jobs </span>
                <span className="info-box-number">
                {jobCount} 
                  <small></small>
                </span>
              </div>
              
            </div>
            
          </div>
          
          
          

          
          <div className="clearfix hidden-md-up"></div>

        
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box mb-3">
              <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users"></i></span>

              <div className="info-box-content">
                <span className="info-box-text">Users</span>
                <span className="info-box-number">{userCount}</span>
              </div>
              
            </div>
            
          </div>
          
        </div>
        

        <div className="row">
          
          <div className="col-md-8">
            
            
            <div className="row">
              
              <div className="col-md-6">
                
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Members</h3>

                    <div className="card-tools">
                      
                      <button type="button" className="btn btn-tool" data-card-widget="collapse">
                        <i className="fas fa-minus"></i>
                      </button>
                      <button type="button" className="btn btn-tool" data-card-widget="remove">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="card-body p-0">
                    <ul className="users-list clearfix">
                      {filteredUsers.map((user, index) => (
                        <li key={index}>
                          {user.photo ? (
                            <img src={`http://localhost:3001/uploads/${user.photo}`} alt="User Image" />
                          ) : (
                            <div>No Profile Image</div>
                          )}
                          <a className="users-list-name" href="#">
                            {user.name}
                          </a>
                          <span className="users-list-date">Today</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="card-footer text-center">
                    <a href="/admin/users">View All Users</a>
                  </div>
                  
                </div>
                
              </div>
              
            </div>
            
            <div className="card">
              <div className="card-header border-transparent">
                <h3 className="card-title">Most world jobs</h3>

                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus"></i>
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              
              <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table m-0">
                      <thead>
                        <tr>
                          <th>Location</th>
                          <th>Number of Jobs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {top5Locations.map(([location, count]) => (
                          <tr key={location}>
                            <td>{location}</td>
                            <td>{count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              
              <div className="card-footer clearfix">
                
                <a href="/admin/job" className="btn btn-sm btn-secondary float-right">View All jobs</a>
              </div>
              
            </div>
            
          </div>
          

          <div className="col-md-4">
            
            <div className="info-box mb-3 bg-warning">
              <span className="info-box-icon"><i className="fas fa-tag"></i></span>

              <div className="info-box-content">
                <span className="info-box-text">Number of scraping</span>
                <span className="info-box-number">{logCount}</span>
              </div>
              
            </div>
            
            
            
            <div className="info-box mb-3 bg-danger">
              <span className="info-box-icon"><i className="fas fa-cloud-download-alt"></i></span>

              <div className="info-box-content">
                <span className="info-box-text">Number of apply to job </span>
                <span className="info-box-number">{applyCount}</span>
              </div>
              
            </div>
            
            <div className="info-box mb-3 bg-info">
              <span className="info-box-icon"><i className="far fa-comment"></i></span>

              <div className="info-box-content">
                <span className="info-box-text">Direct Messages</span>
                <span className="info-box-number">{messageCount}</span>
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
    
  )
}

export default Dashboard

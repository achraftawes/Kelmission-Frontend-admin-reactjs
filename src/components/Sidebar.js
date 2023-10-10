import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


function Sidebar() {

  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0); // State variable to store the number of users

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
  

  return (  
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
 
  <div className="sidebar">
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      
      <div className="image" >
        <img src="/adminkit/img/favicon.png" style={{ borderRadius: '0', width: '42px' }} alt="Logo" />
      </div>
      <div className="info" style={{ color: 'white' }}>
        <h4 href="#" className="d-block">Kelmission</h4>
      </div>
    </div>
    
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            {adminProfile && adminProfile.photo ? (
              <img src={`http://localhost:3001/uploads/${adminProfile.photo}`}  className="img-circle elevation-2" alt="User Image" />
            ) : (
              <div>No Profile Image</div>
            )}
          </div>
          <div className="info">
            <a href="#" className="d-block" style={{ paddingTop: '4px' }} >{adminProfile ? adminProfile.name : 'Admin'}</a>
          </div>
        </div>

    
    

    
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <div><p></p></div>
        <li className="nav-item menu-open">
          
          <ul className="nav nav-treeview">
            
            <li className="nav-item">
              <a href="/admin/" className="nav-link active">
                <i className="far fa-circle nav-icon"></i>
                <p>Home</p>
              </a>
            </li>
            
          </ul>
        </li>
        <li className="nav-item">
          <a href="/admin/job" className="nav-link">
            <i className="nav-icon fas fa-th"></i>
            <p>
              Jobs
              <span className="badge badge-info right"></span>
            </p>
          </a>
        </li>
        
        <li className="nav-header">User Information</li>
        <li className="nav-item">
          <a href="/admin/users" className="nav-link">
            <i className="nav-icon fas fa-columns"></i>
            <p>
              Users
              <span className="badge badge-info right"></span> 
            </p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/admin/cv" className="nav-link">
          <i className="nav-icon fas fa-book"></i>
            <p>
              Cv
            </p>
          </a>
        </li>
        
        
        
        <li className="nav-header">Notification</li>
        <li className="nav-item">
          <a href="/admin/messages" className="nav-link">
            <i className="nav-icon fas fa-ellipsis-h"></i>
            <p>Messages</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/admin/comments" className="nav-link">
            <i className="nav-icon fas fa-ellipsis-h"></i>
            <p>Comments</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/admin/candidature" className="nav-link">
            <i className="nav-icon fas fa-file"></i>
            <p>Candidature</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/admin/favoris" className="nav-link">
            <i className="fas fa-circle nav-icon"></i>
            <p>Favoris</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/admin/log" className="nav-link">
            <i className="nav-icon fas fa-circle"></i>
            <p>
              Time scraping
              
            </p>
          </a>
          
        </li>
        
        
      </ul>
    </nav>
    
  </div>
  
</aside>
  

)

  
}

export default Sidebar

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/get_messages', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  
    // Add a delay of 1000 milliseconds before navigating to /login
    setTimeout(() => {
      navigate('/');
      // Reload the page after navigation
      window.location.reload();
    }, 1000);
  };

  function formatTimeElapsed(created_at) {
    const now = new Date();
    const messageDate = new Date(created_at);
    const timeDifference = now - messageDate;
  
    const minutes = Math.floor(timeDifference / 60000);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hours ago`;
    }
  
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }

  return (
    <nav className="main-header navbar navbar-expand navbar-dark">
  
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/admin/" className="nav-link">Home</a>
        </li>
        
      </ul>

  
  <ul className="navbar-nav ml-auto">
    
    

    
    <li className="nav-item dropdown">
  <a className="nav-link" data-toggle="dropdown" href="#">
    <i className="far fa-comments"></i>
    <span className="badge badge-danger navbar-badge">{messages.length}</span>
  </a>
  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
  {messages.map((message, index) => (
  <a key={index} href="#" className="dropdown-item">
    <div className="media">
      <div className="media-body">
        <h3 className="dropdown-item-title">
          {message.names}
          <span className="float-right text-sm text-muted">
            <i className="far fa-clock mr-1"></i>
            {formatTimeElapsed(message.created_at)}
          </span>
        </h3>
        <p className="text-sm">{message.message_text}</p>
      </div>
    </div>
  </a>
))}
    <div className="dropdown-divider"></div>
    <a href="/admin/messages" className="dropdown-item dropdown-footer">See All Messages</a>
  </div>
</li>
    
    
<li className="nav-item">
          <a
            className="nav-link"
            href="#"
            role="button"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
    
  </ul>
</nav>
  )
}

export default Navbar

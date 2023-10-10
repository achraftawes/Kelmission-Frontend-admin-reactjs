import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const params = new URLSearchParams(window.location.search);

  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const response = await axios.post('http://localhost:3001/api/auth/admin-login', {
        email,
        password,
      });

      if (response.status === 200) {
        setSuccess('Success Login'); // Set the success message
        setError(null);

        if (response.data.token) {
          // Save the token and its expiration time in localStorage
          const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours in milliseconds
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('tokenExpiration', expirationTime);

          setToken(response.data.token);

          // Redirect to the admin page
          setTimeout(() => {
            navigate('/admin');
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      setSuccess(null); // Clear any previous success message

      if (error.response && error.response.status === 401) {
        setError('Go to mail and verify your account, please.');
      } else if (error.response && error.response.status === 403) {
        setError('You are not an admin. You cannot log in to this page.');
      } else {
        setError('Something went wrong during login. Please try again later.');
      }
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a><b>Kelmission</b>Admin</a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form method="post" onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Email" required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password"  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </div>
              </div>
                <div><p></p></div>
              {error && (
                <div className="alert alert-danger alert-dismissible">
                  <h5><i className="icon fas fa-ban"></i> Alert!</h5>
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
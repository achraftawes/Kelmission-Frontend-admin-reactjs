
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import { BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import Job from './pages/Job';
import Cv from './pages/Cv';
import Messages from './pages/Messages';
import Comments from './pages/Comments';
import Candidature from './pages/Candidature';
import Favoris from './pages/Favoris';
import Log from './pages/Log';
import Userprofile from './pages/Userprofile';
import Jobdetail from './pages/Jobdetail';


// Import your LoginPage component
import Login from './pages/Login';
import LoginPage from './components/LoginPage';


function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <div>
      <BrowserRouter>
        {/* Conditionally render Navbar and Sidebar based on authentication */}
        {isAuthenticated && (
          <>
            <Sidebar />
            <Navbar />
          </>
        )}

        <Routes>
          {/* Public route for Login page */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected routes */}
          {isAuthenticated ? (
            <>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/job" element={<Job />} />
              <Route path="/admin/cv" element={<Cv />} />
              <Route path="/admin/messages" element={<Messages />} />
              <Route path="/admin/comments" element={<Comments />} />
              <Route path="/admin/candidature" element={<Candidature />} />
              <Route path="/admin/favoris" element={<Favoris />} />
              <Route path="/admin/log" element={<Log />} />
              <Route path="/admin/users/:user_id" element={<Userprofile />} />
              <Route path="/admin/job/:job_id" element={<Jobdetail />} />
            </>
          ) : (
            // Redirect to the Login page if not authenticated
            <Route path="/" element={<LoginPage />} />
          )}
        </Routes>

        
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
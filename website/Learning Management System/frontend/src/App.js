import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  const isAuthenticated = !!localStorage.getItem('access_token');
  const heroImage = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1170&auto=format&fit=crop";

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">EduNexus LMS</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto align-items-center">
              <Link className="nav-link" to="/">Home</Link>
              {isAuthenticated ? (
                <>
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  <Link className="nav-link px-3" to="/profile">
                    <span className="btn btn-sm btn-outline-light rounded-pill">My Profile</span>
                  </Link>
                  <button className="btn btn-link nav-link text-danger" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/login">Login</Link>
                  <Link className="nav-link" to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <div>
            <div style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textAlign: 'center'
            }}>
              <div className="container">
                <h1 className="display-3 fw-bold">Master New Skills Online</h1>
                <p className="lead mb-4">Empower your future with top-rated courses and expert mentors.</p>
                {!isAuthenticated ? (
                  <Link to="/register" className="btn btn-warning btn-lg px-5 rounded-pill fw-bold">Get Started</Link>
                ) : (
                  <Link to="/dashboard" className="btn btn-primary btn-lg px-5 rounded-pill fw-bold">Explore Courses</Link>
                )}
              </div>
            </div>

            <div className="container py-5">
              <div className="row text-center g-4">
                <div className="col-md-4">
                  <div className="p-4 border rounded shadow-sm bg-white">
                    <h2 className="fw-bold text-primary">5,000+</h2>
                    <p className="text-muted mb-0">Active Students</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-4 border rounded shadow-sm bg-white">
                    <h2 className="fw-bold text-primary">150+</h2>
                    <p className="text-muted mb-0">Expert Instructors</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-4 border rounded shadow-sm bg-white">
                    <h2 className="fw-bold text-primary">300+</h2>
                    <p className="text-muted mb-0">Total Courses</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container pb-5">
              <h3 className="text-center fw-bold mb-5">Course Categories</h3>
              <div className="row g-4">
                {['Web Development', 'Data Science', 'Graphic Design', 'Digital Marketing'].map((cat, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card h-100 text-center border-0 shadow-sm p-3 hover-shadow">
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{cat}</h5>
                        <p className="card-text text-muted small">Explore the latest trends and tools in {cat}.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        } />

        <Route path="/login" element={<div className="container mt-4"><Login /></div>} />
        <Route path="/register" element={<div className="container mt-4"><Register /></div>} />
        <Route path="/forgot-password" element={<div className="container mt-4"><ForgotPassword /></div>} />
        <Route path="/reset-password/:uid/:token" element={<div className="container mt-4"><ResetPassword /></div>} />
        <Route path="/dashboard" element={isAuthenticated ? <div className="container mt-4"><Dashboard /></div> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <div className="container mt-4"><Profile /></div> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
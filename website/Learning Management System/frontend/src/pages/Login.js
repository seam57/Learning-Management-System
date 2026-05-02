import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const loginBg = "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=1170&auto=format&fit=crop";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password,
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            window.location.href = '/dashboard';
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div style={{
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${loginBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '15px'
        }}>
            <div className="card shadow-lg border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
                <div className="card-body p-5 bg-white">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-dark">Welcome Back</h2>
                        <p className="text-muted">Login to your LMS account</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Username</label>
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ fontSize: '1rem' }}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label fw-semibold">Password</label>
                            <input
                                type="password"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ fontSize: '1rem' }}
                                required
                            />
                        </div>

                        {/* পাসওয়ার্ড রিসেট লিঙ্ক এখানে যোগ করা হয়েছে */}
                        <div className="text-end mb-4">
                            <Link to="/forgot-password" size="small" className="text-primary text-decoration-none small fw-bold">
                                Forgot password?
                            </Link>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm mb-3">
                            Login
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <p className="small text-muted">Don't have an account? <Link to="/register" className="text-primary text-decoration-none fw-bold">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
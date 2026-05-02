import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            // ১. ইউজার রেজিস্ট্রেশন
            await axiosInstance.post('accounts/register/', formData);

            // ২. রেজিস্ট্রেশন সফল হলে সরাসরি লগইন এপিআই কল করা
            const loginResponse = await axiosInstance.post('accounts/login/', {
                username: formData.username,
                password: formData.password,
            });

            // ৩. টোকেন লোকাল স্টোরেজে সেভ করা
            localStorage.setItem('access_token', loginResponse.data.access);
            localStorage.setItem('refresh_token', loginResponse.data.refresh);

            alert("Registration and Login Successful!");

            // সরাসরি ড্যাশবোর্ডে পাঠানো
            window.location.href = '/dashboard';

        } catch (error) {
            console.error("Registration Error:", error);
            if (error.response && error.response.data) {
                const data = error.response.data;
                // সার্ভার থেকে আসা নির্দিষ্ট এরর মেসেজ দেখানো
                if (data.username) {
                    setErrorMsg(`Username: ${data.username[0]}`);
                } else if (data.email) {
                    setErrorMsg(`Email: ${data.email[0]}`);
                } else if (data.password) {
                    setErrorMsg(`Password: ${data.password[0]}`);
                } else if (data.detail) {
                    setErrorMsg(data.detail);
                } else {
                    setErrorMsg("Registration failed! Please try different details.");
                }
            } else {
                setErrorMsg("Server is not responding. Please check if Django is running.");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5 card p-4 shadow-lg border-0">
                    <h3 className="text-center mb-4 text-primary fw-bold">Create Account</h3>

                    {errorMsg && (
                        <div className="alert alert-danger py-2 text-center" style={{ fontSize: '14px' }}>
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Choose a unique username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Minimum 6 characters"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100 fw-bold shadow-sm py-2">
                            Sign Up & Start Learning
                        </button>
                    </form>

                    <p className="text-center mt-3 small text-muted">
                        Already have an account? <span className="text-primary fw-bold" style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Login here</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
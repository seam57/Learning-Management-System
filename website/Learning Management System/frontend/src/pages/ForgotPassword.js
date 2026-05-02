import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/accounts/password-reset/', {
                email: email.trim()
            });
            setMessage(response.data.message);
            setEmail('');
        } catch (err) {
            if (err.response && err.response.data) {
                const serverError = err.response.data.error || err.response.data.email;
                setError(Array.isArray(serverError) ? serverError[0] : serverError);
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card shadow border-0 p-4 mt-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-dark">Forgot Password</h2>
                        <p className="text-muted small">Enter your registered email to receive a reset link.</p>
                    </div>

                    {message && <div className="alert alert-success py-2 small">{message}</div>}
                    {error && <div className="alert alert-danger py-2 small">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email Address</label>
                            <input
                                type="email"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ fontSize: '0.9rem' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm">
                            Send Reset Link
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <a href="/login" className="text-decoration-none small fw-bold text-primary">
                            Back to Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
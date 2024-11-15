import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSuccess = async (response) => {
        try {
            const googleToken = response.credential;
            const res = await fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: googleToken }),
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('authToken', data.token);
                navigate('/');
            }
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make API request to the backend
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            // Handle successful login
            console.log('Login successful:', response.data);
            localStorage.setItem('authToken', response.data.token);

            // Navigate to the home page
            navigate('/');

        } catch (err) {
            // Handle error
            console.error('Login error:', err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // Use server error message
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    name="email"
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor='password'>Password</label>
                <input
                    type="password"
                    name="password"
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
            <div className="google-login">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.error('Google Login Failed')} />
            </div>
        </div>
    );
};

export default Login;

// Signup.jsx
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Signup.css';

const Signup = ({ onSuccess }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

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
                onSuccess();
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Google signup error:', error);
            setError('Google signup failed.');
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Signup successful:", data.message);
                alert('Sign Up Succesfull. Login to Continue');
                // Redirect or display success message
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                console.error("Signup failed:", data.message);
                setError(data.message); // Display error message from backend
            }
        } catch (error) {
            console.error("Error in signup request:", error);
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignupSubmit}>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Signup</button>
            </form>
            <div className="google-signup">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google signup failed.')} />
            </div>
        </div>
    );
};

export default Signup;

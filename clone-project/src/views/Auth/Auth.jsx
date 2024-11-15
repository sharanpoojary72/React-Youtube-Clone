// Auth.jsx
import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from '../Login/login';
import Signup from '../SignUp/SignUp';
import './Auth.css';
import { CLIENT_ID } from '../../data';

const Auth = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div className='auth-body'>
                <div className="auth-container">
                    <div className="auth-toggle">
                        <button
                            className={`auth-button ${isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`auth-button ${!isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Signup
                        </button>
                    </div>
                    <div className="auth-form">
                        {isLogin ? <Login onSuccess={onAuthSuccess} /> : <Signup onSuccess={onAuthSuccess} />}
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Auth;

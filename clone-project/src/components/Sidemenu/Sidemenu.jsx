import React, { useEffect, useState } from 'react';
import './Sidemenu.css';
import jack from '../../assets/user.jpg';
import { useNavigate } from 'react-router-dom';

import { SlHome } from "react-icons/sl";
import { FaGoogle, FaRegKeyboard } from "react-icons/fa";
import { MdOutlineSwitchAccount, MdOutlineModeNight } from "react-icons/md";
import { PiSignOutLight } from "react-icons/pi";
import { TbPremiumRights } from "react-icons/tb";
import { HiOutlineLanguage } from "react-icons/hi2";
import { SiSpringsecurity } from "react-icons/si";
import { CiGlobe, CiSettings } from "react-icons/ci";
import { LuHelpCircle } from "react-icons/lu";
import { MdOutlineFeedback } from "react-icons/md";

const Sidemenu = ({ sideMenu, setFormMenu }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ username: '', email: '' });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('https://react-youtube-clone-29v7.onrender.com/api/auth/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleSignOut = () => {
        // Clear any stored session/authentication data
        localStorage.removeItem('authToken');

        // Redirect to the authentication page
        navigate('/auth');
    };

    return (
        <div className={`feedback ${sideMenu ? "feedback-visible" : ""}`}>
            <div className='user-link'>
                <div className="userimg">
                    <img src={jack} alt="" />
                </div>
                <div className="userinfo">
                    <p>{userInfo.username || 'Username'}</p>
                    <p>{userInfo.email || 'Email Id'}</p>
                    <a href=""> View your Channel</a>
                </div>
            </div>
            <hr />
            <div className='shortcut-links'>
                <div className="side-link">
                    <FaGoogle /> <p>Google Account</p>
                </div>
                <div className="side-link">
                    <MdOutlineSwitchAccount /> <p>Switch Account</p>
                </div>
                <div className="side-link" onClick={handleSignOut}>
                    <PiSignOutLight /> <p>Sign Out</p>
                </div>
            </div>
            <hr />
            <div className='shortcut-links'>
                <div className="side-link">
                    <SlHome /> <p>YouTube Studio</p>
                </div>
                <div className="side-link">
                    <TbPremiumRights /> <p>Your Premium Benefits</p>
                </div>
                <div className="side-link">
                    <TbPremiumRights /> <p>Purchases and Membership</p>
                </div>
            </div>
            <hr />
            <div className='shortcut-links'>
                <div className="side-link">
                    <SlHome /> <p>Your Data in YouTube</p>
                </div>
                <div className="side-link">
                    <MdOutlineModeNight /> <p>Appearance: Light</p>
                </div>
                <div className="side-link">
                    <HiOutlineLanguage /> <p>Language: English</p>
                </div>
                <div className="side-link">
                    <SiSpringsecurity /> <p>Restricted Mode: Off</p>
                </div>
                <div className="side-link">
                    <CiGlobe /> <p>Location: India</p>
                </div>
                <div className="side-link">
                    <FaRegKeyboard /> <p>Keyboard shortcuts</p>
                </div>
            </div>
            <hr />
            <div className='shortcut-links'>
                <div className="side-link">
                    <CiSettings /> <p>Settings</p>
                </div>
            </div>
            <hr />
            <div className='shortcut-links'>
                <div className="side-link">
                    <LuHelpCircle /> <p>Help</p>
                </div>
                <div className="side-link" onClick={() => setFormMenu(prev => prev === false ? true : false)}>
                    <MdOutlineFeedback /> <p>Send feedback</p>
                </div>
            </div>
        </div>
    );
};

export default Sidemenu;

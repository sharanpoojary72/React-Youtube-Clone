import React, { useState } from 'react'
import './Navbar.css'
import { HiMicrophone } from "react-icons/hi2";
import menu_icon from '../../assets/hamburger.png'
import logo from '../../assets/youtubeFull.png'
import upload from '../../assets/upload.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/user.jpg'
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import Feedback from '../Sidemenu/Sidemenu';

const Navbar = ({ setSidebar, setSearchResults,sideMenu,setSideMenu,setFormMenu }) => {


    return (
        <nav className='flex-div'>
            <div className='nav-left flex-div'>
                <img className='menu_icon' src={menu_icon} alt="" onClick={() => setSidebar(prev => prev === false ? true : false)} />
                <a href="/">
                    <img className='logo' src={logo} alt="" />
                </a>
                
            </div>

            <div className='flex-div nav-middle'>
                <div className='flex-div search-box'>

                    {/* <input type="text" placeholder="Search" />
                    <img src={search} alt="" /> */}
                    <Search setSearchResults={setSearchResults} />

                </div>
                <button className='mic-button'>
                    <HiMicrophone className='mic' />
                </button>
            </div>

            <div className='flex-div nav-right'>
                <img src={upload} alt="" />
                <img src={notification_icon} alt="" />
                <img src={profile_icon} className='user-icon' alt="" onClick={()=> setSideMenu(prev=>prev=== false?true:false)}/>
            
                <Feedback sideMenu={sideMenu} setFormMenu={setFormMenu}/>
            
            </div>
        </nav>
    )
}

export default Navbar
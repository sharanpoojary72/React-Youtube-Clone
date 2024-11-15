import React from 'react';
import './sidebar.css';

import { } from 'react-icons/fa';
import { SlHome } from "react-icons/sl";
import { SiYoutubeshorts, SiYoutubemusic } from "react-icons/si";
import { MdOutlineSubscriptions, MdOutlineNewspaper, MdOutlinePodcasts,MdOutlineFeedback ,MdOutlineFlag  } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { CgPlayListSearch } from "react-icons/cg";
import { AiOutlineFire } from "react-icons/ai";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMusicalNotesOutline, IoGameControllerOutline,IoSettingsOutline  } from "react-icons/io5";
import { BsCameraReels, BsBroadcast } from "react-icons/bs";
import { GoTrophy } from "react-icons/go";
import { PiLightbulbBold } from "react-icons/pi";
import { GiHanger } from "react-icons/gi";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { LiaDownloadSolid, LiaFileVideoSolid } from "react-icons/lia";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebar, category, setCategory,setSideMenu,setFormMenu }) => {

    return (
        <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
            <div className="shortcut-links">
                <Link to={'/'} className={`side-link ${category === 0 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <SlHome className='react-logo'/><p>Home</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 42 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <SiYoutubeshorts className='react-logo'/><p>Shorts</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <MdOutlineSubscriptions className='react-logo'/><p>Subscriptions</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 10 ? "active" : ""}`} onClick={() => setCategory(10)}>
                    <SiYoutubemusic className='react-logo'/><p>Youtube Music</p>
                </Link>
            </div>
            <hr />
            <div className="shortcut-links">
                <div className='side-link'>
                    <h3>You</h3>
                </div>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <LuHistory className='react-logo'/><p>History</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <CgPlayListSearch className='react-logo'/><p>Playlists</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <LiaFileVideoSolid className='react-logo'/><p>Your Videos</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <BsCameraReels className='react-logo'/><p>Your Movies</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <PiLightbulbBold className='react-logo'/><p>your Courses</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <MdOutlineWatchLater className='react-logo'/><p>Watch Later</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <BiLike className='react-logo'/><p>Liked Videos</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <LiaDownloadSolid className='react-logo'/><p>Downloads</p>
                </Link>
            </div>
            <hr />
            <div className="shortcut-links">
                <div className='side-link'>
                    <h3>Explore</h3>
                </div>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <AiOutlineFire className='react-logo'/><p>Trending</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <RiShoppingBag4Line className='react-logo'/><p>Shopping</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 10 ? "active" : ""}`} onClick={() => setCategory(10)}>
                    <IoMusicalNotesOutline className='react-logo'/><p>Your Music</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 18 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <BsCameraReels className='react-logo'/><p>Movies</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <BsBroadcast className='react-logo'/><p>Live</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 20 ? "active" : ""}`} onClick={() => setCategory(20)}>
                    <IoGameControllerOutline className='react-logo'/><p>Gaming</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 25 ? "active" : ""}`} onClick={() => setCategory(25)}>
                    <MdOutlineNewspaper className='react-logo'/><p>News</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 17 ? "active" : ""}`} onClick={() => setCategory(17)}>
                    <GoTrophy className='react-logo'/><p>Sports</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 28 ? "active" : ""}`} onClick={() => setCategory(28)}>
                    <PiLightbulbBold className='react-logo'/><p>Course</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 26 ? "active" : ""}`} onClick={() => setCategory(26)}>
                    <GiHanger className='react-logo'/><p>Fashion & Beauty</p>
                </Link>
                <Link to={'/'} className={`side-link ${category === 100 ? "active" : ""}`} onClick={() => setCategory(0)}>
                    <MdOutlinePodcasts className='react-logo'/><p>Podcasts</p>
                </Link>
            </div>
            <hr />
            <div className='shortcut-links'>
                <div to={'/'} className='side-link'>
                    <IoSettingsOutline  className='react-logo'/> <p>Settings</p>
                </div>
                <div to={'/'} className='side-link'>
                    <MdOutlineFlag  className='react-logo'/> <p>Report history</p>
                </div>
                <div to={'/'} className='side-link'>
                    <IoIosHelpCircleOutline  className='react-logo'/> <p>Help</p>
                </div>
                <div className='side-link' onClick={()=> setFormMenu(prev=>prev=== false?true:false)}>
                    <MdOutlineFeedback  className='react-logo'/> <p>Send Feedback</p>
                </div>
            </div>
            <hr />
            <div className="footer side-link">
                <p>&copy; 2024 Google LLC</p>
            </div>
        </div>
    )
}

export default Sidebar
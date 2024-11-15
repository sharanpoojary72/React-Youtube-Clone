import React, { useEffect } from 'react';
import './Video.css';
import PlayVideo from '../../components/PlayVideo/PlayVideo';
import Recommended from '../../components/Recommended/Recommended';
import { useOutletContext, useParams } from 'react-router';
import Sidebar from '../../components/Sidebar/Sidebar';

const Video = () => {
    const { videoId, categoryId } = useParams();
    const { category, setCategory, sidebar, setSidebar, setFormMenu } = useOutletContext();

    // Hide the sidebar when the Video component is opened
    useEffect(() => {
        setSidebar(false); // Hide sidebar when the component mounts
    
        return () => {
            setSidebar(true); // Show sidebar when the component unmounts
        };
    }, [setSidebar]);

    return (
        <div className='play-container'>
            {/* Conditionally render Sidebar based on the sidebar state */}
            {sidebar && (
                <Sidebar 
                    sidebar={sidebar} 
                    category={category} 
                    setCategory={setCategory} 
                    setFormMenu={setFormMenu} 
                    className={`${sidebar ? "" : 'sidebarHide'}`}
                />
            )}
            <PlayVideo videoId={videoId} />
            <Recommended categoryId={categoryId} videoId={videoId} />
        </div>
    );
};

export default Video;

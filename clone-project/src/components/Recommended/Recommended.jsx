import React, { useEffect, useState } from 'react'
import './Recommended.css'

import { API_KEY, value_converter } from '../../data';
import { NavLink } from 'react-router-dom';

const Recommended = ({ categoryId }) => {

    const [recomApiData, setrecomApiData] = useState([]);

    const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&videoCategoryId=${categoryId}&key=${API_KEY}`;
        

        await fetch(relatedVideo_url)
            .then(res => res.json())
            .then(data => setrecomApiData(data.items));
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (

        <div className='recommended'>
            {recomApiData.map((item, index) => (
                <NavLink to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_converter(item.statistics.viewCount)} Views</p>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default Recommended
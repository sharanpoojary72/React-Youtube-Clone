import React, { useEffect, useState } from 'react';
import './feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment/moment';
import Loader from '../../components/Loader/Loader';

const Feed = ({ category }) => {
    const [data, setData] = useState([]);
    const [channelData, setChannelData] = useState({});
    const [loading, setLoading] = useState(true); // Add a loading state

    const fetchData = async () => {
        setLoading(true); // Start loading
        try {
            const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&videoCategoryId=${category}&key=${API_KEY}`;
            const response = await fetch(videoList_url);
            const result = await response.json();
            setData(result.items);
        } catch (error) {
            console.error("Error fetching video data:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const fetchChannelData = async (videos) => {
        setLoading(true); // Start loading
        try {
            const uniqueChannelIds = [
                ...new Set(videos.map(video => video.snippet?.channelId).filter(Boolean))
            ];

            const channelDataResponses = await Promise.all(
                uniqueChannelIds.map(async channelId => {
                    const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    return data.items[0];
                })
            );

            // Create an object to easily access channel data by channel ID
            const channelDataMap = channelDataResponses.reduce((acc, channel) => {
                acc[channel.id] = channel;
                return acc;
            }, {});
            setChannelData(channelDataMap);
        } catch (error) {
            console.error("Error fetching channel data:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    useEffect(() => {
        if (data.length > 0) {
            fetchChannelData(data);
        }
    }, [data]);

    if (loading) {
        return <Loader />; // Display the loader while loading is true
    }

    return (
        <div className='feed'>
            {data.map((item, index) => {
                const channelId = item.snippet?.channelId;
                const channelThumbnail = channelId && channelData[channelId]?.snippet.thumbnails.default?.url;

                return (
                    <Link to={`/video/${item.snippet?.categoryId}/${item.id}`} className='card' key={index}>
                        <img src={item.snippet?.thumbnails?.maxres?.url ||
                            item.snippet?.thumbnails?.medium?.url ||
                            item.snippet?.thumbnails?.high?.url ||
                            item.snippet?.thumbnails?.default?.url} alt="Thumbnail" />
                        <div className='feed-data'>
                            <div className='feed-user'>
                                <img src={channelThumbnail || ''} alt="" />
                            </div>
                            <div className='feed-info'>
                                <h2>{item.snippet?.title}</h2>
                                <h3>{item.snippet?.channelTitle}</h3>
                                <p>
                                    {item.statistics?.viewCount ? value_converter(item.statistics.viewCount) : 0} views &bull;{' '}
                                    {moment(item.snippet?.publishedAt).fromNow()}
                                </p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Feed;

import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import { API_KEY, formatNumberWithCommas, value_converter } from '../../data';
import moment from 'moment/moment';
import { useParams } from 'react-router';
import { SlLike, SlDislike } from "react-icons/sl";
import { PiShareFatLight } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import Loader from '../../components/Loader/Loader'; // Import the Loader component

const PlayVideo = () => {
    const { videoId } = useParams();

    const [apiData, setApiData] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state

    const fetchVideoData = async () => {
        setLoading(true); // Start loading
        const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;

        try {
            const res = await fetch(videoDetailsUrl);
            const data = await res.json();
            setApiData(data.items[0]);
        } catch (error) {
            console.error("Error fetching video data:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const fetchOtherData = async () => {
        if (!apiData || !apiData.snippet) return; // Check if apiData is loaded

        setLoading(true); // Start loading
        try {
            // Fetching Channel Data
            const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
            const channelRes = await fetch(channelDataUrl);
            const channelData = await channelRes.json();
            setChannelData(channelData.items[0]);

            // Fetching comment data
            const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=30&videoId=${videoId}&key=${API_KEY}`;
            const commentRes = await fetch(commentUrl);
            const commentData = await commentRes.json();
            setCommentData(commentData.items);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        if (videoId) {
            fetchVideoData();
        }
    }, [videoId]);

    useEffect(() => {
        if (apiData) {
            fetchOtherData();
        }
    }, [apiData]);

    if (loading) {
        return <Loader />; // Show loader while loading is true
    }

    if (!apiData) {
        return <p>Loading...</p>;
    }

    const { snippet, statistics } = apiData;
    const { title, channelTitle, description, publishedAt } = snippet;
    const { viewCount, likeCount, commentCount } = statistics;

    return (
        <div className='play-video'>
            <div className='video-container'>
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
            <div className='video-data'>
                <h3>{title}</h3>
                <div className="play-video-info">
                    <div className="publisher">
                        <div className='channel-data'>
                            <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt="" />
                            <div>
                                <p>{channelTitle}</p>
                                <span>{channelData ? `${value_converter(channelData.statistics.subscriberCount)} Subscribers` : "1M Subscribers"}</span>
                            </div>
                        </div>
                        <button>Subscribe</button>
                    </div>

                    <div className='user-interact'>
                        <div className='like-dislike ld-button'>
                            <div className="like">
                                <SlLike className='img' />
                                <p>{value_converter(likeCount)}</p>
                            </div>
                            <div className='dislike'><SlDislike className='img' /></div>
                        </div>
                        <div className='ld-button'><PiShareFatLight className='img' /><p>Share</p></div>
                        <div className='ld-button'><LiaDownloadSolid className='img' /><p>Download</p></div>
                    </div>
                </div>

                <div className="video-description">
                    <div className="description-text">
                        <p className='count-time'>
                            {formatNumberWithCommas(viewCount)} Views &nbsp; {moment(publishedAt).fromNow()}
                        </p>
                        <p className='full-description'>
                            {showFullDescription ? description : `${description.slice(0, 100)}...`}
                            {description.length > 100 && (
                                <button onClick={() => setShowFullDescription(!showFullDescription)}>
                                    {showFullDescription ? "Show less" : "Show more"}
                                </button>
                            )}
                        </p>
                    </div>
                </div>
        
                <h4>{formatNumberWithCommas(commentCount)} Comments</h4>

                {commentData.map((item, index) => (
                    <div className="comments" key={index}>
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl || ""} alt="" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName || "Author Name"} <span>{item.timeAgo}</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textOriginal || "Comments"}</p>
                            <div className="comment-action">
                                <SlLike alt="like" />{value_converter(item.snippet.topLevelComment.snippet.likeCount) || "110"}<span>{item.likes}</span>
                                <SlDislike alt="dislike" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayVideo;

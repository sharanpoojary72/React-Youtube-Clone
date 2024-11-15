import React, { useEffect, useState } from 'react';
import './SearchPage.css'
import { useOutletContext, useLocation, useSearchParams, Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import Sidebar from '../../components/Sidebar/Sidebar';
import Loader from '../../components/Loader/Loader'

import thumbnail1 from '../../assets/thumbnail1.png'

const SearchPage = () => {

    const { sidebar } = useOutletContext();
    const [category, setCategory] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); // Extracts the 'q' parameter from the URL

    const [loading, setLoading] = useState(false); // Add a loading state

    useEffect(() => {
        if (query) {
            fetchSearchResults(query);
        }
    }, [query]);

    const fetchSearchResults = async (query) => {
        setLoading(true); // Start loading
        try {
            const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=10&key=${API_KEY}`;
            const response = await fetch(searchUrl);
            const searchData = await response.json();

            const videoIds = searchData.items.map(item => item.id.videoId).join(',');
            const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${API_KEY}`;
            const videoDetailsResponse = await fetch(videoDetailsUrl);
            const videoDetailsData = await videoDetailsResponse.json();

            const combinedData = searchData.items.map(item => ({
                ...item,
                statistics: videoDetailsData.items.find(detail => detail.id === item.id.videoId)?.statistics || {},
                categoryId: videoDetailsData.items.find(detail => detail.id === item.id.videoId)?.snippet.categoryId || {},
            }));
            setSearchResults(combinedData);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    if (loading) {
        return <Loader />; // Display the loader while loading is true
    }

    return (
        <>
            <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />

            <div className={`search-containers ${sidebar ? "" : 'search-large-containers'}`}>
                {searchResults.map((item, index) => (
                    <Link to={`/video/${item.categoryId}/${item.id.videoId}`} className="search-result-card" key={index}>
                        <img src={item.snippet?.thumbnails?.maxres?.url ||
                            item.snippet?.thumbnails?.medium?.url ||
                            item.snippet?.thumbnails?.high?.url ||
                            item.snippet?.thumbnails?.default?.url} alt="Thumbnail" />
                        <div className='search-video-detail'>
                            <div className='search-video-info'>
                                <h2>{item.snippet?.title}</h2>
                                <p>
                                    {item.statistics?.viewCount ? value_converter(item.statistics.viewCount) : 0} views &bull;{' '}
                                    {moment(item.snippet?.publishedAt).fromNow()}
                                </p>
                            </div>
                            <div className='search-user-img'>
                                <img src={thumbnail1 || ''} alt="" />
                                <h3>{item.snippet?.channelTitle}</h3>
                            </div>
                            <div className='search-video-description'>
                                <p>
                                    {item.snippet.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </>
    )
}

export default SearchPage
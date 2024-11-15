import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../../data';
import './Search.css';
import { CiSearch } from "react-icons/ci";

const Search = ({ setSearchResults }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault(); //Prevent form from refreshing the page

        if (!query) return;

        try {
            console.log("Search initiated for:", query);

            // Fetch search results
            const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=10&key=${API_KEY}`;
            const response = await fetch(searchUrl);
            const searchData = await response.json();

            // Fetch additional details for each video to get categoryId
            const videoIds = searchData.items.map(item => item.id.videoId).join(',');
            const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds}&key=${API_KEY}`;
            const videoDetailsResponse = await fetch(videoDetailsUrl);
            const videoDetailsData = await videoDetailsResponse.json();

            // Combine search data with category data
            const combinedData = searchData.items.map(item => {
                const videoDetails = videoDetailsData.items.find(detail => detail.id === item.id.videoId);
                return {
                    ...item,
                    categoryId: videoDetails?.snippet?.categoryId,
                };
            });

            console.log(combinedData);

            // Set search results
            setSearchResults(combinedData);

            // Navigate to the results page
            navigate(`/results?q=${encodeURIComponent(query)}`);

        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}> {/* Attach handleSearch to form onSubmit */}
                <label htmlFor="searchbar">
                    <input
                        name='searchbar'
                        id='searchbar'
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} // Update query state on input change
                    />
                </label>
                <button type="submit"><CiSearch className='search-logo' /></button> {/* Button type set to submit */}
            </form>
        </div>
    );
};

export default Search;

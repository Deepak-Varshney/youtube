import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import axios from 'axios';


const HomePage = () => {
    
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get('/api/videos/random');
                setVideos(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchVideos();
    },[]);

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => (
                <>
                <VideoCard key={index} video={video} />
                </>
            ))}
        </div>
    );
};

export default HomePage;
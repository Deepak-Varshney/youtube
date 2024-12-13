import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';

const sampleVideo = {
    _id: '1',
    title: 'Sample Video Title',
    description: 'This is a sample description for the video.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1616759648335-e0d3b7834685?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8eW91dHViZSUyMHRodW1ibmFpbHxlbnwwfHwwfHx8MA%3D%3D',
    views: 1234,
    likes: ['user1', 'user2'],
    dislikes: ['user3'],
    user: {
        username: 'Sample User',
        profilePicture: 'https://images.unsplash.com/photo-1616759648335-e0d3b7834685?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8eW91dHViZSUyMHRodW1ibmFpbHxlbnwwfHwwfHx8MA%3D%3D',
    },
    createdAt: "2 hour ago"
};

const HomePage = () => {
    
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        setVideos([sampleVideo, sampleVideo, sampleVideo, sampleVideo, sampleVideo, sampleVideo, sampleVideo, sampleVideo, sampleVideo]);
    },[]);

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video, index) => (
                <VideoCard key={index} video={video} />
            ))}
        </div>
    );
};

export default HomePage;
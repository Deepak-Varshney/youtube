// import React from 'react';
// import { useParams } from 'react-router-dom';

// const video = {
//   _id: '1',
//   title: 'Sample Video Title',
//   description: 'This is a detailed description of the video. It can be multiple lines long and contain lots of information about the video content.',
//   videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Sample embed URL
//   thumbnailUrl: 'https://images.unsplash.com/photo-1616759648335-e0d3b7834685',
//   views: 1234,
//   likes: ['user1', 'user2'],
//   dislikes: ['user3'],
//   user: {
//     username: 'Channel Name',
//     profilePicture: 'https://via.placeholder.com/50',
//     subscribers: 10000
//   },
//   createdAt: "2 hours ago"
// };

// const VideoPage = () => {
//   const { id } = useParams();

//   return (
//     <div className="flex flex-col lg:flex-row gap-4 p-4">
//       {/* Left column - Video Player and Info */}
//       <div className="lg:w-8/12">
//         {/* Video Player */}
//         <div className="w-full aspect-video bg-black">
//           <iframe
//             className="w-full h-full"
//             src={sampleVideo.videoUrl}
//             title={sampleVideo.title}
//             frameBorder="0"
//             allowFullScreen
//           ></iframe>
//         </div>

//         {/* Video Info */}
//         <div className="mt-4">
//           <h1 className="text-xl font-bold">{sampleVideo.title}</h1>
//           <div className="flex justify-between items-center mt-2">
//             <span className="text-gray-600">{sampleVideo.views} views • {sampleVideo.createdAt}</span>
//             <div className="flex gap-4">
//               <button className="flex items-center gap-1">
//                 <span>👍 {sampleVideo.likes.length}</span>
//               </button>
//               <button className="flex items-center gap-1">
//                 <span>👎 {sampleVideo.dislikes.length}</span>
//               </button>
//               <button className="flex items-center gap-1">
//                 <span>Share</span>
//               </button>
//             </div>
//           </div>

//           {/* Channel Info */}
//           <div className="flex items-center gap-4 mt-4 pb-4 border-b">
//             <img
//               src={sampleVideo.user.profilePicture}
//               alt={sampleVideo.user.username}
//               className="w-12 h-12 rounded-full"
//             />
//             <div>
//               <h3 className="font-bold">{sampleVideo.user.username}</h3>
//               <p className="text-gray-600">{sampleVideo.user.subscribers} subscribers</p>
//             </div>
//             <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full">
//               Subscribe
//             </button>
//           </div>

//           {/* Description */}
//           <div className="mt-4 bg-gray-100 p-4 rounded-lg">
//             <p>{sampleVideo.description}</p>
//           </div>

//           {/* Comments Section */}
//           <div className="mt-4">
//             <h3 className="text-xl font-bold mb-4">Comments</h3>
//             {/* Comments will be added later */}
//             <div className="text-gray-600">Comments are coming soon...</div>
//           </div>
//         </div>
//       </div>

//       {/* Right column - Related Videos */}
//       <div className="lg:w-4/12">
//         <h2 className="text-lg font-bold mb-4">Related Videos</h2>
//         {/* Related videos will be added later */}
//         <div className="text-gray-600">Related videos are coming soon...</div>
//       </div>
//     </div>
//   );
// };

// export default VideoPage;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'timeago.js';
const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8800/api/videos/${id}`);
        setVideo(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="flex justify-center p-8 text-red-500">Error: {error}</div>;
  if (!video) return <div className="flex justify-center p-8">Video not found</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Left column - Video Player and Info */}
      <div className="lg:w-8/12">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black">
          <iframe
            className="w-full h-full"
            src={video.videoUrl}
            title={video.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="mt-4">
          <h1 className="text-xl font-bold">{video.title}</h1>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600">{video.views} views • {format(video.createdAt)}</span>
            <div className="flex gap-4">
              <button className="flex items-center gap-1">
                <span>👍 {video.likes.length}</span>
              </button>
            
              <button className="flex items-center gap-1">
                <span>👎 {video.dislikes.length}</span>
              </button>
              <button className="flex items-center gap-1">
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex items-center gap-4 mt-4 pb-4 border-b">
            <img
              src={video.user.profilePicture}
              alt={video.user.username}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-bold">{video.user.username}</h3>
              <p className="text-gray-600">{video.user.subscribers} subscribers</p>
            </div>
            <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full">
              Subscribe
            </button>
          </div>

          {/* Description */}
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <p>{video.description}</p>
          </div>

          {/* Comments Section */}
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-4">Comments</h3>
            {/* Comments will be added later */}
            <div className="text-gray-600">Comments are coming soon...</div>
          </div>
        </div>
      </div>

      {/* Right column - Related Videos */}
      <div className="lg:w-4/12">
        <h2 className="text-lg font-bold mb-4">Related Videos</h2>
        {/* Related videos will be added later */}
        <div className="text-gray-600">Related videos are coming soon...</div>
      </div>
            
    </div>
  );
};

export default VideoPage;
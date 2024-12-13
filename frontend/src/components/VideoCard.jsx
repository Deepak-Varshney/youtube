import React from 'react';
import { Link } from 'react-router-dom';


const VideoCard = ({video}) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
     <Link to={`/video/${video._id}`}>
        <img className="w-full" src={video.thumbnailUrl} alt="thumbnail" />
      </Link>
      <div className="flex px-4 py-2">
        <img className="w-10 h-10 rounded-full mr-4" src={video.user.profilePicture} />
        <div>
          <Link to={`/video/${video._id}`}>
            <div className="font-bold text-lg">{video.title}</div>
          </Link>
          <div className="text-gray-600 text-sm">{video.user.username}</div>
          <span className="text-gray-600 text-sm">{video.views} views • </span>
          <span className="text-gray-600 text-sm">{video.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
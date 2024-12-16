// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import VideoCard from '../components/VideoCard';

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     profilePicture: ''
//   });
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('/api/users/me');
//       setUser(response.data);
//       setFormData({
//         username: response.data.username,
//         email: response.data.email,
//         profilePicture: response.data.profilePicture
//       });
//        // Fetch user's videos using the videos array in the user object
//        const videosResponse = await axios.get(`/api/videos?ids=${response.data.videos.join(',')}`);
//        setVideos(videosResponse.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error fetching profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put('/api/users/me', formData);
//       setIsEditing(false);
//       fetchUserProfile();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error updating profile');
//     }
//   };
//   console.log(user)
//   // console.log((user.videos));
//   if (loading) return <div className="flex justify-center p-8">Loading...</div>;
//   if (error) return <div className="flex justify-center p-8 text-red-500">{error}</div>;
//   if (!user) return <div className="flex justify-center p-8">User not found</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Profile Header */}
//       <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//         <div className="flex flex-col md:flex-row items-center gap-8">
//           {/* Profile Picture */}
//           <div className="w-32 h-32 rounded-full overflow-hidden">
//             <img
//               src={user.profilePicture || 'https://via.placeholder.com/128'}
//               alt={user.username}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Profile Info */}
//           <div className="flex-1">
//             {isEditing ? (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Username</label>
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
//                   <input
//                     type="url"
//                     name="profilePicture"
//                     value={formData.profilePicture}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div className="flex gap-4">
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                   >
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setIsEditing(false)}
//                     className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <div>
//                 <h1 className="text-2xl font-bold">{user.username}</h1>
//                 <p className="text-gray-600">{user.email}</p>
//                 <div className="mt-4 flex gap-4">
//                   <span className="text-gray-600">{user.subscribers} subscribers</span>
//                   <span className="text-gray-600">{user.subscribedTo.length} subscriptions</span>
//                   <span className="text-gray-600">{videos.length} videos</span>
//                 </div>
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                 >
//                   Edit Profile
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* User's Videos */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">Uploaded Videos</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {videos.map((video) => (
//             <VideoCard key={video._id} video={video} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profilePicture: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users/me');
      setUser(response.data);
      setFormData({
        username: response.data.username,
        email: response.data.email,
        profilePicture: response.data.profilePicture
      });
      // Fetch user's videos using the videos array in the user object
      console.log(response.data.videos)
      if (response.data.videos<=0) {
        return
      }
      const videosResponse = await axios.get(`/api/videos?ids=${response.data.videos.join(',')}`);
      setVideos(videosResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/users/me', formData);
      setIsEditing(false);
      fetchUserProfile();
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="flex justify-center p-8 text-red-500">{error}</div>;
console.log(user)
  if (!user) return <div className="flex justify-center p-8">User not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={user.profilePicture || 'https://th.bing.com/th?id=OIP.yyVZtJgcX_k4j10PaEadSgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                  <input
                    type="url"
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-4 flex gap-4">
                  <span className="text-gray-600">{user.subscribers} subscribers</span>
                  <span className="text-gray-600">{user.subscribedTo.length} subscriptions</span>
                  <span className="text-gray-600">{videos.length} videos</span>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* User's Videos */}
      {
        videos.length<=0?(
          <div>No videos found</div>
        ):(
          <div>
          <h2 className="text-xl font-bold mb-4">Uploaded Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
        )

      }
      
    </div>
  );
};

export default ProfilePage;
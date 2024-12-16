import mongoose from 'mongoose';
import { Video } from '../models/video.model.js';
import { User } from '../models/user.model.js';

// @desc    Get all videos
// @route   GET /api/videos/all
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('user', 'username profilePicture'); // Populate additional user details
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc    Create a new video
// @route   POST /api/videos
const createVideo = async (req, res) => {
  const { title, description, videoUrl, thumbnailUrl } = req.body;

  try {
    if (!title || !description || !videoUrl || !thumbnailUrl) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Automatically assign the logged-in user's ID to the video
    const video = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      user: req.user.id,  // Use user ID from the JWT token
    });

    // Save the new video to the database
    await video.save();
    // Update the user's videos array with the new video ID
    await User.findByIdAndUpdate(req.user.id, {
      $push: { videos: video._id }
    });

    res.status(201).json({ message: 'Video created successfully', video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc    Delete a video
// @route   DELETE /api/videos/:id
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if the logged-in user is the owner of the video
    if (video.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this video' });
    }

    await video.remove();
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// //  Get a specific video by ID
// const getVideo = async (req, res) => {
//   try {
//     const videoId = req.params.id;

//     // Validate the video ID (optional but recommended)
//     if (!mongoose.Types.ObjectId.isValid(videoId)) {
//       return res.status(400).json({ message: 'Invalid video ID' });
//     }

//     const video = await Video.findById(videoId).populate('user', 'username email profilePicture subscribers'); // Populate additional user details


//     if (!video) {
//       return res.status(404).json({ message: 'Video not found' });
//     }

//     res.status(200).json(video);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// @desc    Like a video
// @route   PUT /api/videos/:id/like
const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if the user has already liked the video
    if (video.likes.includes(req.user.id)) {
      return res.status(400).json({ message: 'You have already liked this video' });
    }

    // Remove the user from dislikes if they have disliked the video
    video.dislikes.pull(req.user.id);

    // Add the user to likes
    video.likes.push(req.user.id);

    await video.save();
    res.status(200).json({ message: 'Video liked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Dislike a video
// @route   PUT /api/videos/:id/dislike
const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if the user has already disliked the video
    if (video.dislikes.includes(req.user.id)) {
      return res.status(400).json({ message: 'You have already disliked this video' });
    }

    // Remove the user from likes if they have liked the video
    video.likes.pull(req.user.id);

    // Add the user to dislikes
    video.dislikes.push(req.user.id);

    await video.save();
    res.status(200).json({ message: 'Video disliked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get random videos
// @route   GET /api/videos/random
const getRandomVideos = async (req, res) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 44 } }]);
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get videos sorted by views
// @route   GET /api/videos/trending
const getTrendingVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ views: -1 }).limit(44);
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get videos by tags
// @route   GET /api/videos/tags
const getVideosByTags = async (req, res) => {
  const tags = req.query.tags.split(',');
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(10);
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search videos by title
// @route   GET /api/videos/search
const searchVideos = async (req, res) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({ title: { $regex: query, $options: 'i' } }).limit(44);
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get videos by IDs
// @route   GET /api/videos
const getVideosByIds = async (req, res) => {
  const ids = req.query?.ids.split(',');
  try {
    const videos = await Video.find({ _id: { $in: ids } });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { getAllVideos, createVideo, deleteVideo, likeVideo, dislikeVideo, getRandomVideos, getTrendingVideos, getVideosByTags, searchVideos, getVideosByIds };

